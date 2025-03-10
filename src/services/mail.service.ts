import { Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { SendRecord } from "../interfaces/mail.interface";

@Injectable()
export class MailService {

    private logger: Logger = new Logger(MailService.name);
    private prisma: PrismaClient = new PrismaClient();

    public async setSendRecord(record: SendRecord): Promise<void> {
        try {
            this.logger.log(`[ setSendRecord() ]: Guardando registro de envio`);
            await this.prisma.$connect();
            await this.prisma.sendRecord.create({ data: {
                name: record.name,
                email: record.email,
                idLayout: record.layout.id,
                subject: record.subject
            }});
        } catch (error) {
            this.logger.error(`[ setSendRecord() ]: Ha ocurrido un error al guardar el registro ${error.message}`);
            throw error;
        } finally {
            await this.prisma.$disconnect();
        };
    };

};
