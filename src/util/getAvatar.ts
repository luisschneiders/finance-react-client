import crypto from 'crypto';

export function getAvatar(email: string) {
  const md5: string = crypto.createHash('md5').update(email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=200&d=identicon`;
}
