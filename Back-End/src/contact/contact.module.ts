import { Nodemailer, NodemailerDrivers, NodemailerModule, NodemailerOptions } from '@crowdlinker/nestjs-mailer';
import { Module } from '@nestjs/common';
import { getMaxListeners } from 'node:process';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

@Module({

imports: [
 
  NodemailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'user',
        pass:'pass',
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      }
    },defaults: { from: '"No Reply" <noreply5adamet@gmail.com>'}
    
  }),
],

  controllers: [
    ContactController,
    
  ],
  providers: [
    ContactService,
  
  ]
})
export class ContactModule {

}
