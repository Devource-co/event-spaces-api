import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          url: configService.get('databaseUrl'),
          logger: 'file',
          entities: ['build/**/*.entity.js'],
          subscribers: ['build/**/*.subscriber.js'],
          migrations: ['build/src/db/migrations/*js'],
          autoLoadEntities: true,
          logging: true,
          cli: {
            migrationsDir: 'src/db/migrations',
          },
          synchronize: false,
          relationLoadStrategy: 'query',
        };
      },
    }),
  ],
})
export class DatabaseModule {}
