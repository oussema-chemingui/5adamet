import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageModule } from '../package/package.module';
import { LinkModule } from '../link/link.module';
import { OrderItem } from './order-item.entity';
import { OrderItemService } from './order-item.service';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { StripeModule } from 'nestjs-stripe';
import { ConfigService } from '@nestjs/config';
import { OrderListener } from './listener/order.listener';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    LinkModule,
    PackageModule,
    StripeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('STRIPE_KEY'),
        apiVersion: '2020-08-27',
      }),
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderItemService, OrderListener],
})
export class OrderModule {}
