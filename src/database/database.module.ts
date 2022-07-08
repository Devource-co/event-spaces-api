import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('databaseUrl'),
        logger: 'file',
        entities: ['dist/**/*.entity.js'],
        migrations: ['dist/src/db/migrations/*js'],
        autoLoadEntities: true,
        cli: {
          migrationsDir: 'src/db/migrations',
        },
        synchronize: configService.get<string>('env') !== 'production',
      }),
    }),
  ],
})
export class DatabaseModule {}
