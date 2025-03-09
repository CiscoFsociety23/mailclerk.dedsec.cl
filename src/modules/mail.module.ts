import { Module } from "@nestjs/common";
import { MailController } from "../controllers/mail.controller";

@Module({
    controllers: [MailController]
})
export class MailModule {};
