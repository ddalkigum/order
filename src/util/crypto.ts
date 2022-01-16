import crypto from 'crypto';

export const encryptWithSHA256 = (ci: string) => {
  return crypto.createHash('sha256').update(ci).digest('base64');
}