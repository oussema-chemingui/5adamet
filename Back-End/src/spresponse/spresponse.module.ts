import { Module } from '@nestjs/common';
import { SpresponseService } from './spresponse.service';
import { SpresponseController } from './spresponse.controller';
import { CostestimationModule } from 'src/costestimation/costestimation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpResponseRepository } from './sprespose.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([SpResponseRepository]),
        CostestimationModule,
        AuthModule
      ],
  providers: [SpresponseService],
  controllers: [SpresponseController]
})
export class SpresponseModule {}
