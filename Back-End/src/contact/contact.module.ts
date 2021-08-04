import { Nodemailer } from '@crowdlinker/nestjs-mailer';
import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

@Module({
  controllers: [
    ContactController,
  ],
  providers: [
    ContactService,
    Nodemailer
  ]
})
export class ContactModule {

}
