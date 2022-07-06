// generate a hkdf key
import hkdf from 'futoin-hkdf';

const generateHkdfKey = (ikm, length, salt, info = '', hash = 'SHA-256') => {
  // return a buffer key
  return hkdf(ikm, length, { salt, info, hash });
};

export default generateHkdfKey;
