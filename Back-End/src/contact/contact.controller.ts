import { Body, Controller, Post } from '@nestjs/common';
import { CreateContactDto } from './create-contact.dto';
import { ContactService } from './contact.service';

@Controller('contacts')
export class ContactController {
  constructor(private contactService: ContactService){}
  @Post('/new-mail')
  newMail
  (
  @Body('name') name: string, 
  @Body('email') email: string, 
  @Body('subject') subject: string, 
  @Body('message') message: string, 
  ) {
    this.contactService.mailing(name, email, subject, message);
  }
}
