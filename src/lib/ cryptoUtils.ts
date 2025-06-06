// src/lib/cryptoUtils.ts
import { scryptSync, createCipheriv, randomBytes, createDecipheriv } from 'crypto';

export function encrypt(text: string, secretKey: string) {
  const iv = randomBytes(16); // Initialization vector
  const key = scryptSync(secretKey, 'salt', 32); // Generate a secure key
  const cipher = createCipheriv('aes-256-ctr', key, iv);

  const encryptedText = Buffer.concat([
    cipher.update(text, 'utf8'),
    cipher.final(),
  ]);

  return {
    iv: iv.toString('hex'),
    content: encryptedText.toString('hex'),
  };
}


export function decrypt(encrypted: { iv: string; content: string }, secretKey: string): string {
    const iv = Buffer.from(encrypted.iv, 'hex');
    const key = scryptSync(secretKey, 'salt', 32);
    const decipher = createDecipheriv('aes-256-ctr', key, iv);
  
    const decryptedText = Buffer.concat([
      decipher.update(Buffer.from(encrypted.content, 'hex')),
      decipher.final(),
    ]);
  
    return decryptedText.toString();
  }