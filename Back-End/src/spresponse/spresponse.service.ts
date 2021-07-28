import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpResponseRepository } from './sprespose.repository';

@Injectable()
export class SpresponseService {
    constructor(
        @InjectRepository(SpResponseRepository)
        private spResponseRepository : SpResponseRepository
    ){}
    
}
