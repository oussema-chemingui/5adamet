import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Order } from '../order.entity';

@Injectable()
export class OrderListener {
  //   constructor(private redisService: RedisService) {}
  //   @OnEvent('order.completed')
  //   async handeleOrderCompletedEvent(order: Order) {}
}
