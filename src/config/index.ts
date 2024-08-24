/* eslint-disable @typescript-eslint/no-require-imports */
import * as dotenv from 'dotenv';
import config from './env/default.config';

export default () => {
  if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
    let localConfig = {};
    try {
      // The environment file might not exist

      localConfig = require(`./env/${config.env}.config`).default;
      localConfig = localConfig || {};
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      localConfig = {};
    }
    return Object.assign(config, localConfig);
  }
  return config;
};
