import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { MailController } from "../controllers/mail.controller";
import { MailService } from "../services/mail.service";
import { CheckIfAdmin } from "src/middlewares/mail.middleware";

@Module({
    controllers: [MailController],
    providers: [MailService]
})
export class MailModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CheckIfAdmin).forRoutes(
            {
                path: '/api-mailclerk/mail/welcome',
                method: RequestMethod.POST
            },
            {
                path: '/api-mailclerk/mail/validation',
                method: RequestMethod.POST
            }
        );
    };
};
