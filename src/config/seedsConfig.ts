import { DataSource, DataSourceOptions } from 'typeorm';
import config from '.';

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  url: config().databaseUrl,
  logging: true,
  synchronize: false,
  entities: ['build/**/*.entity.js'],
  migrations: ['build/seeds/*.js'],
} as unknown as DataSourceOptions);
