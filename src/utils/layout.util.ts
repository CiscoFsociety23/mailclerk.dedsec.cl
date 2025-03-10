import { Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { Layout } from "../interfaces/mail.interface";

export class LayoutUtil {

    private logger: Logger = new Logger(LayoutUtil.name);
    private prisma: PrismaClient = new PrismaClient();

    public async getLayout(name: string): Promise<Layout> {
        try {
            this.logger.log(`[ getLayout() ]: Obteniendo plantilla ${name}`);
            await this.prisma.$connect();
            const layoutB64 = await this.prisma.layout.findUnique({
                where: {name}
            });
            return layoutB64 as Layout;
        } catch (error) {
            this.logger.error(`[ getLayout() ]: Ha ocurrido un error al obtener la plantilla ${error.message}`);
            throw error;
        } finally {
            await this.prisma.$disconnect();
        };
    };

};
