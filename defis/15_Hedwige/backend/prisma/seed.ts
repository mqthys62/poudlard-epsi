import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seed de la base de données...');

  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash('Poudlard2025!', 10);

  // Créer un utilisateur par défaut
  const defaultUser = await prisma.user.upsert({
    where: { email: 'harry.potter@poudlard.fr' },
    update: {},
    create: {
      email: 'harry.potter@poudlard.fr',
      password: hashedPassword,
      name: 'Harry Potter',
      avatar: 'https://i.pravatar.cc/150?img=33',
      emailVerified: true,
    },
  });

  console.log('✅ Utilisateur créé:', defaultUser.email);

  // Créer quelques emails de démo
  await prisma.email.createMany({
    data: [
      {
        userId: defaultUser.id,
        from: 'dumbledore@poudlard.fr',
        to: ['harry.potter@poudlard.fr'],
        subject: 'Bienvenue à Poudlard !',
        body: '<p>Cher Harry,</p><p>Bienvenue à Poudlard ! Nous sommes ravis de t\'accueillir parmi nous.</p><p>Cordialement,<br/>Albus Dumbledore</p>',
        folder: 'inbox',
        isRead: false,
        isStarred: true,
      },
      {
        userId: defaultUser.id,
        from: 'hermione.granger@poudlard.fr',
        to: ['harry.potter@poudlard.fr'],
        subject: 'Devoirs de Potions',
        body: '<p>Salut Harry,</p><p>N\'oublie pas les devoirs de Potions pour demain !</p><p>Hermione</p>',
        folder: 'inbox',
        isRead: false,
      },
      {
        userId: defaultUser.id,
        from: 'ron.weasley@poudlard.fr',
        to: ['harry.potter@poudlard.fr'],
        subject: 'Match de Quidditch',
        body: '<p>Hey Harry,</p><p>On se retrouve sur le terrain à 14h ?</p><p>Ron</p>',
        folder: 'inbox',
        isRead: true,
      },
    ],
  });

  console.log('✅ Emails de démo créés');
  console.log('\n🎯 Identifiants de connexion:');
  console.log('   Email: harry.potter@poudlard.fr');
  console.log('   Mot de passe: Poudlard2025!');
  console.log('\n🌱 Seed terminé avec succès !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

