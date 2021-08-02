import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './create-contact.dto';
import { Nodemailer, NodemailerDrivers } from '@crowdlinker/nestjs-mailer';
import * as config from '../mailconfig';

@Injectable()
export class ContactService {
  constructor(private readonly nodeMailerService: Nodemailer<NodemailerDrivers.SMTP>) {
  }

   mailing(
   name: string, 

   email: string, 
   subject: string, 
   message: string, 
   ) {
       this.nodeMailerService.sendMail({
        to: config.default.mail.email,
        from: email,
        subject: subject,
        text: message,
        html: `<h2>hey ${name} i want to greet to you</h2>
          <br />
          <h2>please contact us by phone for any additional details</h2>`,
      }).then(value => {
      console.log(value);
      }).catch(err => {
        console.error(err);
      });
    }
}
