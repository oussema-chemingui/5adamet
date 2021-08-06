import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostAnswerController } from './costanswer.controller';
import { CostAnswerRepository } from './costanswer.repository';
import { CostAnswerService } from './costanswer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CostAnswerRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),

  ],
  controllers: [CostAnswerController],
  providers: [CostAnswerService],
  exports: [CostAnswerService],
})
export class CostanswerModule {}
