import { Module } from '@nestjs/common';
import { MailclerkModule } from './modules/mailclerk.module';
import { MailModule } from './modules/mail.module';

@Module({
  imports: [MailclerkModule, MailModule]
})
export class AppModule {};
