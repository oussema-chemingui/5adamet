import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { Link } from '../link/link.entity';
import { PackageService } from '../package/package.service';
import { LinkService } from '../link/link.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { OrderItem } from './order-item.entity';
import { Package } from '../package/package.entity';
import { OrderItemService } from './order-item.service';
import { Connection } from 'typeorm';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { string } from '@hapi/joi';

@Controller()
export class OrderController {
  constructor(
    private orderService: OrderService,
    private linkService: LinkService,
    private packageService: PackageService,
    private orderItemService: OrderItemService,
    private connection: Connection,
    @InjectStripe() private readonly stripeClient: Stripe,
    private configService: ConfigService,
  ) {}

  @Get('admin/order')
  all() {
    return this.orderService.find();
  }

  @Post('checkout/orders')
  async create(@Body() body: CreateOrderDto) {
    const link: Link = await this.linkService.findOne({
      code: body.code,
      relations: ['user'],
    });

    if (!link) {
      throw new BadRequestException('Invalid link!');
    }

    const queryRunner = this.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      //create new Order
      const o = new Order();
      o.user_id = link.user.id;
      o.first_name = body.first_name;
      o.last_name = body.last_name;
      o.email = body.email;
      o.address = body.address;
      o.country = body.country;
      o.city = body.city;
      o.zip = body.zip;
      o.code = body.code;

      const order = await queryRunner.manager.save(o);

      const line_items = [];

      //create order-item
      for (const p of body.packages) {
        const package: Package = await this.packageService.findOne({
          id: p.package_id,
        });

        const orderItem = new OrderItem();
        orderItem.order = order;
        orderItem.package_title = package.title;
        orderItem.price = package.price;
        orderItem.quantity = p.quantity;

        await queryRunner.manager.save(orderItem);

        line_items.push({
          name: package.title,
          description: package.description,
          amount: package.price,
          currency: 'dt',
          quantity: p.quantity,
        });
      }

      const source = await this.stripeClient.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        // eslint-disable-next-line prettier/prettier
        success_url:`${this.configService.get('CHECKOUT_URL')}/success?source={CHECKOUT_SESSION_ID}`,
        cancel_url: `${this.configService.get('CHECKOUT_URL')}/error`,
      });

      order.transaction_id = source['id'];
      await queryRunner.manager.save(order);

      await queryRunner.commitTransaction();
      return source;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException();
    } finally {
      await queryRunner.release();
    }
  }

  @Post('checkout/orders/confirm')
  async confirm(@Body('source') source: string) {
    const order = await this.orderService.findOne({
      transaction_id: source,
      relation: ['order_items'],
    });

    if (!order) {
      throw new NotFoundException('Order not found!');
    }
  }
}
