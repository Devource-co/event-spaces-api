// decrypt signed Cipher
import macSign from './macSign';
import decrypt from './decrypt';

const decryptSignedCipher = (
  ikm,
  info,
  authenticationTag,
  serializedResponse,
) => {
  /*
   * needs four params
   */
  // get the buffer for this
  const bData = Buffer.from(serializedResponse, 'base64');
  // get the iv
  const iv = bData.slice(1, 17);
  if (iv.length !== 16) {
    throw new Error('Invalid Iv Length');
  }
  const mac = bData.slice(18, 50);
  if (mac.length !== 32) {
    throw new Error('Invalid mac Length');
  }
  const cipher = bData.slice(50); // this one is a buffer
  // create a ref mac and validate
  const refMac = Buffer.from(macSign(ikm, authenticationTag, cipher), 'base64');
  if (Buffer.compare(mac, refMac) !== 0) {
    /*
     * 0 - this means they are equal
     * 1 - this means the mac buffer is higher than the refMac Buffer
     * -1 - this means the refMac Buffer is higher than the mac Buffer
     */
    throw new Error('Mac authentication failed');
  }
  const cipherText = cipher.toString('base64');
  try {
    return decrypt(cipherText, iv, ikm, info);
  } catch (e) {
    return null;
  }
};

// decryptSignedCipher();
export default decryptSignedCipher;
