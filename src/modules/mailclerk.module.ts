import { Module } from '@nestjs/common';
import { MailclerkController } from '../controllers/mailclerk.controller';
import { MailclerkService } from '../services/mailclerk.service';

@Module({
  controllers: [MailclerkController],
  providers: [MailclerkService],
})
export class MailclerkModule {};
