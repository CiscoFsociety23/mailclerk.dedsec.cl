import { Controller, Get, Logger, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { MailclerkService } from '../services/mailclerk.service';
import { ServiceInformation } from '../interfaces/mailclerk.interface';

@Controller('api-mailclerk')
export class MailclerkController {

  private logger: Logger = new Logger(MailclerkController.name);
  constructor(private readonly mailclerkService: MailclerkService) {};

  @Get()
  public async getInformation(@Req() request: Request, @Res() response: Response): Promise<void> {
    try {
      this.logger.log(`[ GET ${request.url} ]: Solicitando informacion del servicio`);
      const information: ServiceInformation = await this.mailclerkService.getServerIformacion();
      response.status(200).json(information);
    } catch (error) {
      this.logger.error(`[ GET ${request.url} ]: Ha ocurrido un error al obtener la informacion ${error.message}`);
      response.status(400).json({ message: 'Ha ocurrido un erro al obtener informacion del servicio', error: error.message });
    };
  };

};
