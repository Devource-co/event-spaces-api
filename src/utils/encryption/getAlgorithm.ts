const getAlgorithm = (keyPassed) => {
  const key = Buffer.from(keyPassed, 'base64');

  if (key.length === 16) {
    return 'aes-128-cbc';
  }

  if (key.length === 32) {
    return 'aes-256-cbc';
  }

  throw Error('Invalid key length');
};

export default getAlgorithm;
