/* eslint-disable @typescript-eslint/ban-ts-comment */
// this function is purely to get the plain Text of an encrypted string
// for now we will return it as base 64
import crypto from 'crypto';
import getAlgorithm from './getAlgorithm';
import generateHkdfKey from './generateHkdfKey';

const decrypt = (cipherText, ivParam, ikm, info) => {
  // get the hkdf encryption key
  const encryptionHkdfKey = generateHkdfKey(ikm, 16, null, info); // by default it will use SHA-256 and will return a buffer
  // @ts-ignore Weird
  const key = Buffer.from(encryptionHkdfKey, 'base64');
  const iv = Buffer.from(ivParam, 'base64');
  // let's decrypt the plain text
  try {
    const decipher = crypto.createDecipheriv(
      getAlgorithm(encryptionHkdfKey),
      key,
      iv,
    );
    const decrypted = decipher.update(cipherText, 'base64');
    return Buffer.concat([decrypted, decipher.final()]);
  } catch (e) {
    return null;
  }
};

export default decrypt;
