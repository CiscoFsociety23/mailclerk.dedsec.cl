import { Controller, Logger, Req, Res, Post, Body } from "@nestjs/common";
import { Request, Response } from "express";
import { MessageEmailDTO } from "../interfaces/mail.dto";
import { BrevoUtil } from "../utils/brevo.util";

@Controller('api-mailclerk/mail')
export class MailController {

    private logger: Logger = new Logger(MailController.name);
    private brevoMail: BrevoUtil = new BrevoUtil();

    @Post('message')
    public async sendMessageEmail(@Req() request: Request, @Res() response: Response, @Body() emailData: MessageEmailDTO): Promise<void> {
        try {
            this.logger.log(`[ POST ${request.url} ]: Solicitando enviar correo a: ${emailData.name} ${emailData.reciever}`);
            const sendEmail = await this.brevoMail.sendMessageEmail(emailData);
            if (sendEmail) {
                response.status(200).json({ message: 'Correo enviado con éxito', status: sendEmail });
            } else {
                response.status(400).json({ message: 'Correo no enviado', status: sendEmail });
            };
        } catch (error) {
            this.logger.error(`[ POST ${request.url} ]: Ha ocurrido un error al enviar el correo ${error.message}`);
            response.status(400).json({ message: 'No es posible enviar el correo', status: false, error: error.message});
        };
    };

}
