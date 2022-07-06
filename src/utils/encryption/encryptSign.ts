// this function encrypt and signs the text
import crypto from 'crypto';
import encrypt from './encrypt';
import macSign from './macSign';

const encryptSign = (ikm, info, authenticationTag, plainText) => {
  /*
   * needs four params
   */
  const iv = crypto.randomBytes(16);
  try {
    const cipherText = encrypt(plainText, iv, ikm, info); // cipher text returned which is now base 64
    const signedCipher = macSign(ikm, authenticationTag, cipherText);
    // after signing serialize the response by appending the length of the IV, the IV, the length of the mac, the mac and the encrypted data
    const macBuffer = Buffer.from(signedCipher, 'base64');
    const cipherTextBuffer = Buffer.from(cipherText, 'base64');
    return Buffer.concat([
      Buffer.alloc(1, iv.length),
      iv,
      Buffer.alloc(1, macBuffer.length),
      macBuffer,
      cipherTextBuffer,
    ]).toString('base64');
  } catch (e) {
    return null;
  }
};

export default encryptSign;
