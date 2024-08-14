import { DataSource, DataSourceOptions } from 'typeorm';
import config from '.';

console.log('config().databaseUrl ===>', config().databaseUrl);
export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  url: config().databaseUrl,
  logging: true,
  synchronize: false,
  entities: ['build/**/*.entity.js'],
  migrations: ['build/migrations/*.js'],
} as unknown as DataSourceOptions);
