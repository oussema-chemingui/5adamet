import { Controller, Get, Param } from '@nestjs/common';
import { LinkService } from './link.service';

@Controller('link')
export class LinkController {
  constructor(private linkService: LinkService) {}
  @Get('links/:code')
  async link(@Param('code') code: string) {
    return this.linkService.findOne({
      code,
      relations: ['user', 'packages'],
    });
  }
}
