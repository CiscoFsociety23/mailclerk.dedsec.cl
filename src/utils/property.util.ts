import { Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

export class PropertyUtil {

    private logger: Logger = new Logger(PropertyUtil.name);
    private prisma = new PrismaClient().$extends(withAccelerate());
    
    public async getProperty(key: string): Promise<string> {
        try {
            this.logger.log(`[ getProperty() ]: Obteniendo propiedad ${key}`);
            await this.prisma.$connect();
            const property = await this.prisma.property.findUnique({
                where: {key}
            });
            return property?.value as string;
        } catch (error) {
            this.logger.error(`[ getProperty() ]: Ha ocurrido un error al obtener la propiedad ${error.message}`);
            throw error;
        } finally {
            await this.prisma.$disconnect();
        };
    };

};
