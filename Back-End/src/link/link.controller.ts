// import { Controller, Get, Param } from '@nestjs/common';
// import { LinkService } from './link.service';

// @Controller('link')
// export class LinkController {
//   constructor(private linkService: LinkService) {}

//   @Get('users/:id/links')
//   async all(@Param('id') id: number) {
//     return this.linkService.find({
//       user: id,
//     });
//   }

//   @Get('checkout/links/:code')
//   async link(@Param('code') code: string) {
//     return this.linkService.findOne({
//       code,
//       relations: ['user', 'packages'],
//     });
//   }
// }
