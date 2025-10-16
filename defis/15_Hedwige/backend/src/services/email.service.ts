/**
 * Email Service - IMAP/SMTP Integration
 * Gère l'envoi et la réception d'emails
 * Défi #15 - Hedwige - Workshop Poudlard RP 2025
 */

import nodemailer, { Transporter } from 'nodemailer';
import Imap from 'imap';
import { simpleParser, ParsedMail } from 'mailparser';
import { logger } from '../utils/logger';
import { prisma } from '../database/client';

/**
 * Configuration SMTP pour l'envoi d'emails
 */
interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

/**
 * Configuration IMAP pour la réception d'emails
 */
interface IMAPConfig {
  user: string;
  password: string;
  host: string;
  port: number;
  tls: boolean;
  tlsOptions?: {
    rejectUnauthorized: boolean;
  };
}

/**
 * Interface pour un email à envoyer
 */
interface EmailToSend {
  from: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  text?: string;
  html?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
}

/**
 * Interface pour un email reçu
 */
interface ReceivedEmail {
  messageId: string;
  from: string;
  to: string[];
  cc?: string[];
  subject: string;
  text?: string;
  html?: string;
  date: Date;
  attachments: Array<{
    filename: string;
    content: Buffer;
    contentType: string;
    size: number;
  }>;
}

/**
 * Service de gestion des emails
 */
export class EmailService {
  private smtpTransporter: Transporter | null = null;
  private imapConnection: Imap | null = null;

  /**
   * Initialise la connexion SMTP
   */
  async initSMTP(config: SMTPConfig): Promise<void> {
    try {
      this.smtpTransporter = nodemailer.createTransport(config);
      
      // Vérifier la connexion
      await this.smtpTransporter.verify();
      logger.info('✅ Connexion SMTP établie avec succès');
    } catch (error) {
      logger.error('❌ Erreur de connexion SMTP:', error);
      throw new Error('Échec de la connexion SMTP');
    }
  }

  /**
   * Initialise la connexion IMAP
   */
  initIMAP(config: IMAPConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      this.imapConnection = new Imap(config);

      this.imapConnection.once('ready', () => {
        logger.info('✅ Connexion IMAP établie avec succès');
        resolve();
      });

      this.imapConnection.once('error', (err: Error) => {
        logger.error('❌ Erreur de connexion IMAP:', err);
        reject(new Error('Échec de la connexion IMAP'));
      });

      this.imapConnection.connect();
    });
  }

  /**
   * Envoie un email
   * 
   * @param email - Email à envoyer
   * @param userId - ID de l'utilisateur
   * @returns ID du message envoyé
   */
  async sendEmail(email: EmailToSend, userId: string): Promise<string> {
    if (!this.smtpTransporter) {
      throw new Error('SMTP non initialisé');
    }

    try {
      // Envoyer l'email
      const info = await this.smtpTransporter.sendMail(email);
      
      logger.info(`📧 Email envoyé: ${info.messageId}`);

      // Sauvegarder dans la base de données
      const savedEmail = await prisma.email.create({
        data: {
          userId,
          from: email.from,
          to: Array.isArray(email.to) ? email.to : [email.to],
          cc: email.cc ? (Array.isArray(email.cc) ? email.cc : [email.cc]) : [],
          subject: email.subject,
          body: email.text || '',
          html: email.html || '',
          messageId: info.messageId,
          folder: 'sent',
          isRead: true,
          attachments: email.attachments || [],
        },
      });

      return savedEmail.id;
    } catch (error) {
      logger.error('❌ Erreur lors de l\'envoi de l\'email:', error);
      throw new Error('Échec de l\'envoi de l\'email');
    }
  }

  /**
   * Récupère les emails de la boîte de réception
   * 
   * @param userId - ID de l'utilisateur
   * @param folder - Dossier IMAP (INBOX par défaut)
   * @param limit - Nombre d'emails à récupérer
   * @returns Liste des emails
   */
  async fetchEmails(
    userId: string,
    folder: string = 'INBOX',
    limit: number = 50
  ): Promise<ReceivedEmail[]> {
    if (!this.imapConnection) {
      throw new Error('IMAP non initialisé');
    }

    return new Promise((resolve, reject) => {
      const emails: ReceivedEmail[] = [];

      this.imapConnection!.openBox(folder, false, (err, box) => {
        if (err) {
          logger.error('❌ Erreur lors de l\'ouverture de la boîte:', err);
          return reject(err);
        }

        // Récupérer les derniers emails
        const totalMessages = box.messages.total;
        const start = Math.max(1, totalMessages - limit + 1);
        const fetchRange = `${start}:${totalMessages}`;

        const fetch = this.imapConnection!.seq.fetch(fetchRange, {
          bodies: '',
          struct: true,
        });

        fetch.on('message', (msg, seqno) => {
          msg.on('body', (stream: any) => {
            simpleParser(stream, async (err: Error | null, parsed: ParsedMail) => {
              if (err) {
                logger.error(`❌ Erreur parsing email ${seqno}:`, err);
                return;
              }

              // Extraire les pièces jointes
              const attachments = (parsed.attachments || []).map((att: any) => ({
                filename: att.filename || 'unknown',
                content: att.content,
                contentType: att.contentType,
                size: att.size,
              }));

              const email: ReceivedEmail = {
                messageId: parsed.messageId || `${seqno}-${Date.now()}`,
                from: parsed.from?.text || 'unknown',
                to: parsed.to?.text.split(',').map((t: string) => t.trim()) || [],
                cc: parsed.cc?.text.split(',').map((t: string) => t.trim()),
                subject: parsed.subject || '(no subject)',
                text: parsed.text,
                html: parsed.html || undefined,
                date: parsed.date || new Date(),
                attachments,
              };

              emails.push(email);

              // Sauvegarder dans la base de données
              try {
                await prisma.email.upsert({
                  where: { messageId: email.messageId },
                  update: {},
                  create: {
                    userId,
                    messageId: email.messageId,
                    from: email.from,
                    to: email.to,
                    cc: email.cc || [],
                    subject: email.subject,
                    body: email.text || '',
                    html: email.html || '',
                    folder: 'inbox',
                    isRead: false,
                    attachments: email.attachments,
                    receivedAt: email.date,
                  },
                });
              } catch (dbError) {
                logger.error('❌ Erreur sauvegarde email en DB:', dbError);
              }
            });
          });
        });

        fetch.once('error', (fetchErr) => {
          logger.error('❌ Erreur lors du fetch IMAP:', fetchErr);
          reject(fetchErr);
        });

        fetch.once('end', () => {
          logger.info(`📬 ${emails.length} emails récupérés`);
          resolve(emails);
        });
      });
    });
  }

  /**
   * Marque un email comme lu
   * 
   * @param emailId - ID de l'email
   * @param userId - ID de l'utilisateur
   */
  async markAsRead(emailId: string, userId: string): Promise<void> {
    try {
      await prisma.email.update({
        where: { id: emailId, userId },
        data: { isRead: true },
      });
      
      logger.info(`✅ Email ${emailId} marqué comme lu`);
    } catch (error) {
      logger.error('❌ Erreur lors du marquage comme lu:', error);
      throw error;
    }
  }

  /**
   * Supprime un email (déplace vers la corbeille)
   * 
   * @param emailId - ID de l'email
   * @param userId - ID de l'utilisateur
   */
  async deleteEmail(emailId: string, userId: string): Promise<void> {
    try {
      await prisma.email.update({
        where: { id: emailId, userId },
        data: { folder: 'trash', deletedAt: new Date() },
      });
      
      logger.info(`🗑️ Email ${emailId} déplacé vers la corbeille`);
    } catch (error) {
      logger.error('❌ Erreur lors de la suppression:', error);
      throw error;
    }
  }

  /**
   * Recherche des emails
   * 
   * @param userId - ID de l'utilisateur
   * @param query - Terme de recherche
   * @returns Liste des emails correspondants
   */
  async searchEmails(userId: string, query: string): Promise<any[]> {
    try {
      const emails = await prisma.email.findMany({
        where: {
          userId,
          OR: [
            { subject: { contains: query, mode: 'insensitive' } },
            { body: { contains: query, mode: 'insensitive' } },
            { from: { contains: query, mode: 'insensitive' } },
          ],
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
      });

      return emails;
    } catch (error) {
      logger.error('❌ Erreur lors de la recherche:', error);
      throw error;
    }
  }

  /**
   * Ferme les connexions
   */
  async close(): Promise<void> {
    if (this.imapConnection) {
      this.imapConnection.end();
      logger.info('🔌 Connexion IMAP fermée');
    }

    if (this.smtpTransporter) {
      this.smtpTransporter.close();
      logger.info('🔌 Connexion SMTP fermée');
    }
  }
}

// Export singleton
export const emailService = new EmailService();

