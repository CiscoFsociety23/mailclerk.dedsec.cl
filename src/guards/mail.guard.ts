import { CanActivate, ExecutionContext, Logger } from "@nestjs/common";
import { PropertyUtil } from "../utils/property.util";
import { Request } from "express";
import axios, { AxiosHeaders } from "axios";

export class AuthGuard implements CanActivate {
    private logger: Logger = new Logger(AuthGuard.name);
    private property: PropertyUtil = new PropertyUtil();
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            this.logger.log(`[ AuthGuard() ]: Verificando Token del usuario`);
            const request: Request = context.switchToHttp().getRequest() as Request;
            const { authorization } = request.headers;
            if (authorization != null) {
                this.logger.log(`[ AuthGuard() ]: Token encontrado`);
                const verificationURL: string = await this.property.getProperty('Dedsec Alpha Verification URL');
                this.logger.log(`[ AuthGuard() ]: Solicitando verificacion`);
                const verify = await axios.post(verificationURL, null, { headers: new AxiosHeaders({ 'authorization': `Bearer ${authorization.split(" ")[1]}` })});
                this.logger.log(`[ AuthGuard() ]: ${verify.data.message}`);
                return true;
            } else {
                this.logger.error(`[ AuthGuard() ]: Token no encontrado`);
                return false;
            };
        } catch (error) {
            this.logger.error(`[ AuthGuard() ]: Ha ocurrido un error al validar el token ${error.message}`);
            throw error;
        };
    };
};
