/* eslint-disable @typescript-eslint/ban-ts-comment */
// this function is purely to get the encrypted string
// for now we will return it as base 64
import crypto from 'crypto';
import getAlgorithm from './getAlgorithm';
import generateHkdfKey from './generateHkdfKey';

const encrypt = (plainText, ivParam, ikm, info) => {
  /* encrypt function needs four parameters
   * plainText which is the string you need to encrypt
   * ivParam which is the iv generated
   * ikm the initial keying material to be used in generating the hkdf encryption key
   * info parameter also to be used in generating the hkdf encryption key
   */

  // get the hkdf encryption key
  const encryptionHkdfKey = generateHkdfKey(ikm, 16, null, info); // by default it will use SHA-256 and will return a buffer
  // @ts-ignore weird
  const key = Buffer.from(encryptionHkdfKey, 'base64');
  const iv = Buffer.from(ivParam, 'base64');
  // let's encrypt the plain text
  try {
    const cipher = crypto.createCipheriv(
      getAlgorithm(encryptionHkdfKey),
      key,
      iv,
    );
    let encrypted = cipher.update(plainText, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  } catch (e) {
    const customerMessage = 'Unable to encrypt';
    throw new Error(customerMessage);
  }
};

export default encrypt;
