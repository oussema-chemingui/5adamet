import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { StripeModule } from '@golevelup/nestjs-stripe';

import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CostestimationModule } from './costestimation/costestimation.module';


import { ServiceModule } from './service/service.module';
import { CategoryModule } from './category/category.module';

import { CartModule } from './cart/cart.module';

import { ContactModule } from './contact/contact.module';

import {
  NodemailerDrivers,
  NodemailerModule,
  NodemailerOptions,
} from '@crowdlinker/nestjs-mailer';

import { ReviewModule } from './reviews/review.module';
import { ServiceProviderModule } from './serviceProvider/serviceProvider.module';
import { UserModule } from './auth/user.module';
import { CostanswerModule } from './costanswer/costanswer.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
      isGlobal: true,
    }),

    StripeModule.forRoot(StripeModule, {
      apiKey: '123',
      webhookConfig: {
        stripeWebhookSecret: 'abc',
      },
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod';

        return {
          ssl: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnauthorized: false } : null,
          },
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),

    NodemailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'user',
          pass: 'pass',
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
      },
    } as NodemailerOptions<NodemailerDrivers.SMTP>),

    AuthModule,
    ServiceModule,
    CategoryModule,
    CartModule,
    ContactModule,
    ReviewModule,
    ServiceProviderModule,
    UserModule,
    CostestimationModule,

    CostanswerModule,


    CloudinaryModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),


  ],
  
  providers: [
  ],
})
export class AppModule {}
