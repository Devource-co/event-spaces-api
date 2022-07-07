import { DataSource, DataSourceOptions } from 'typeorm';
import config from '.';

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  url: config().databaseUrl,
  logging: true,
  synchronize: false,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],
} as unknown as DataSourceOptions);
