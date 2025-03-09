import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { PropertyUtil } from '../utils/property.util';
import { ServiceInformation, ServiceList } from '../interfaces/mailclerk.interface';

@Injectable()
export class MailclerkService {

  private logger: Logger = new Logger(MailclerkService.name);
  private property: PropertyUtil = new PropertyUtil();
  private serviceList: ServiceList[] = new Array<ServiceList>();
  private prisma = new PrismaClient().$extends(withAccelerate());

  public async getServerIformacion(): Promise<ServiceInformation> {
    try {
      this.logger.log(`[ getServerIformacion() ]: Obteniendo informacion del servicio`);
      const serverName: string = await this.property.getProperty('Server Name');
      await this.prisma.$connect();
      this.serviceList.splice(0, this.serviceList.length);
      const services = await this.prisma.serviceStatus.findMany({
        select: { name: true, status: {select:{name:true}}}
      });
      services.forEach(service => {
        this.serviceList.push({name: service.name, status: service.status.name});
      });
      return { server: serverName, services: this.serviceList };
    } catch (error) {
      this.logger.error(`[ getServerIformacion() ]: Ha ocurrido un error al obtener la informacion ${error.message}`);
      throw error;
    };
  };

};
