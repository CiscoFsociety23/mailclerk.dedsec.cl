import { Controller, Logger, Req, Res, Post, Body, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { MessageEmailDTO, ValidationEmailDTO, WelcomeEmailDTO } from "../interfaces/mail.dto";
import { BrevoUtil } from "../utils/brevo.util";
import { MailService } from "../services/mail.service";
import { AuthGuard } from "../guards/mail.guard";

@Controller('api-mailclerk/mail')
export class MailController {

    private logger: Logger = new Logger(MailController.name);
    private brevoMail: BrevoUtil = new BrevoUtil();
    constructor(private mailService: MailService) {};

    @Post('message')
    @UseGuards(AuthGuard)
    public async sendMessageEmail(@Req() request: Request, @Res() response: Response, @Body() emailData: MessageEmailDTO): Promise<void> {
        try {
            this.logger.log(`[ POST ${request.url} ]: Solicitando enviar correo a: ${emailData.name} ${emailData.reciever}`);
            const sendEmail = await this.brevoMail.sendMessageEmail(emailData);
            if (sendEmail.status) {
                await this.mailService.setSendRecord({ layout: sendEmail.layout, name: emailData.name, email: emailData.reciever, subject: emailData.subject });
                response.status(200).json({ message: 'Correo enviado con éxito', status: sendEmail.status });
            } else {
                response.status(400).json({ message: 'Correo no enviado', status: sendEmail.status });
            };
        } catch (error) {
            this.logger.error(`[ POST ${request.url} ]: Ha ocurrido un error al enviar el correo ${error.message}`);
            response.status(400).json({ message: 'No es posible enviar el correo', status: false, error: error.message});
        };
    };

    @Post('welcome')
    @UseGuards(AuthGuard)
    public async sendWelcomeEmail(@Req() request: Request, @Res() response: Response, @Body() emailData: WelcomeEmailDTO): Promise<void> {
        try {
            this.logger.log(`[ POST ${request.url} ]: Solicitando enviar correo a: ${emailData.name} ${emailData.reciever}`);
            const sendEmail = await this.brevoMail.sendWelcomeEmail(emailData);
            if (sendEmail.status){
                await this.mailService.setSendRecord({ layout: sendEmail.layout, name: emailData.name, email: emailData.reciever, subject: '¡Bienvenido a Dedsec Corp!' });
                response.status(200).json({ message: 'Correo enviado con éxito', status: sendEmail.status });
            } else {
                response.status(400).json({ message: 'Correo no enviado', status: sendEmail.status });
            };
        } catch (error) {
            this.logger.error(`[ POST ${request.url} ]: Ha ocurrido un error al enviar el correo ${error.message}`);
            response.status(400).json({ message: 'No es posible enviar el correo', status: false, error: error.message});
        };
    };

    @Post('validation')
    @UseGuards(AuthGuard)
    public async sendValidationEmail(@Req() request: Request, @Res() response: Response, @Body() emailData: ValidationEmailDTO): Promise<void> {
        try {
            this.logger.log(`[ POST ${request.url} ]: Solicitando enviar correo a: ${emailData.name} ${emailData.reciever}`);
            const sendEmail = await this.brevoMail.sendValidationEmail(emailData);
            if (sendEmail.status){
                await this.mailService.setSendRecord({ layout: sendEmail.layout, name: emailData.name, email: emailData.reciever, subject: 'Validacion Dedsec Corp' });
                response.status(200).json({ message: 'Correo enviado con éxito', status: sendEmail.status });
            } else {
                response.status(400).json({ message: 'Correo no enviado', status: sendEmail.status });
            };
        } catch (error) {
            this.logger.error(`[ POST ${request.url} ]: Ha ocurrido un error al enviar el correo ${error.message}`);
            response.status(400).json({ message: 'No es posible enviar el correo', status: false, error: error.message});
        };
    };

}
