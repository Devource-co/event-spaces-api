import * as dotenv from 'dotenv';
import config from './env/default.config';

export default () => {
  if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
    let localConfig = {};
    try {
      // The environment file might not exist
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      localConfig = require(`./env/${config.env}.config`).default;
      localConfig = localConfig || {};
    } catch (error) {
      localConfig = {};
    }
    return Object.assign(config, localConfig);
  }
  return config;
};
