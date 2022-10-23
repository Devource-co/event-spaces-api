import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import configuration from './config';
import { AppLoggerMiddleware } from './middlewares/requestlogger.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChatModule } from './chat/chat.module';
import { HttpModule } from '@nestjs/axios';
import { SpaceModule } from './space/space.module';
import { BlogModule } from './blog/blog.module';
import { AddressModule } from './address/address.module';
import { FilesModule } from './files/files.module';
import { SpacetypesModule } from './spacetypes/spacetypes.module';
import { AmenitiesModule } from './amenities/amenities.module';
import { AccessMethodsModule } from './access-methods/access-methods.module';
import { SpaceRulesModule } from './space-rules/space-rules.module';
import { SpaceImagesModule } from './space-images/space-images.module';
import { SpaceScheduleModule } from './space-schedule/space-schedule.module';
import { RateModule } from './rate/rate.module';
import { CancellationPolicyModule } from './cancellation-policy/cancellation-policy.module';
import { FaqsModule } from './faqs/faqs.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    DatabaseModule,
    UsersModule,
    HttpModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    ChatModule,
    SpaceModule,
    BlogModule,
    AddressModule,
    FilesModule,
    SpacetypesModule,
    AmenitiesModule,
    AccessMethodsModule,
    SpaceRulesModule,
    SpaceImagesModule,
    SpaceScheduleModule,
    RateModule,
    CancellationPolicyModule,
    FaqsModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
