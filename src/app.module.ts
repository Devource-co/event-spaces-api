import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import configuration from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        logging: true,
        logger: 'file',
        url: config.get<string>('databaseUrl'),
        entities: ['dist/**/*.entity.js'],
        migrations: ['dist/src/db/migrations/*js'],
        cli: {
          migrationsDir: 'src/db/migrations',
        },
        synchronize: config.get<string>('env') !== 'production',
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
