import * as brevo from '@getbrevo/brevo';
import { Logger } from '@nestjs/common';
import { PropertyUtil } from './property.util';
import { MessageEmailDTO } from '../interfaces/mail.dto';
import { LayoutUtil } from '../utils/layout.util';
import { Layout } from 'src/interfaces/mail.interface';

export class BrevoUtil {

    private logger: Logger = new Logger(BrevoUtil.name);
    private property = new PropertyUtil();
    private brevoInstance = new brevo.TransactionalEmailsApi();
    private email = new brevo.SendSmtpEmail();
    private layoutUtil: LayoutUtil = new LayoutUtil();

    private async setApiKey(): Promise<void> {
        try {
            this.logger.log(`[ setApiKey() ]: Configurando Brevo API KEY`);
            const brevoAPIKey: string = await this.property.getProperty('Brevo API Key');
            this.brevoInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, brevoAPIKey);
        } catch (error) {
            this.logger.error(`[ setApiKey() ]: No es posible configurar la API KEY ${error.message}`);
            throw error;
        };
    };

    public async sendMessageEmail(emailData: MessageEmailDTO): Promise<{layout:Layout, status:boolean}> {
        try {
            this.logger.log(`[ sendMessageEmail() ]: Enviando correo a: ${emailData.reciever}`);
            await this.setApiKey();
            this.email.sender = { name: 'Dedsec Corp', email: 'no-reply@dedsec.cl' };
            this.email.subject = emailData.subject;
            this.email.to = [{ name: emailData.name, email: emailData.reciever }];
            this.logger.log(`[ sendMessageEmail() ]: Configurando plantilla`);
            const layout = await this.layoutUtil.getLayout('Message Layout');
            const layoutHTML = atob(layout.layoutB64);
            const dataMail = { '{name}': emailData.name, '{subject}': emailData.subject, '{content}': emailData.content };
            const htmlContent = Object.entries(dataMail).reduce((html, [key, value]) => html.replace(new RegExp(key, 'g'), value), layoutHTML);
            this.email.htmlContent = htmlContent;
            await this.brevoInstance.sendTransacEmail(this.email);
            this.logger.log(`[ sendMessageEmail() ]: Correo enviado con asunto ${emailData.subject}`);
            return { layout, status: true };
        } catch (error) {
            this.logger.error(`[ sendMessageEmail() ]: Ha ocurrido un erro al enviar el correo ${error.message}`);
            throw error;
        };
    };

};
