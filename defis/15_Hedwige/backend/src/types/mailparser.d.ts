/**
 * Type declarations for mailparser
 */

declare module 'mailparser' {
  import { Readable } from 'stream';

  export interface ParsedMail {
    messageId?: string;
    from?: { text: string };
    to?: { text: string };
    cc?: { text: string };
    subject?: string;
    text?: string;
    html?: string | false;
    date?: Date;
    attachments?: Array<{
      filename?: string;
      content: Buffer;
      contentType: string;
      size: number;
    }>;
  }

  export function simpleParser(
    stream: Readable,
    callback: (err: Error | null, parsed: ParsedMail) => void
  ): void;
}

