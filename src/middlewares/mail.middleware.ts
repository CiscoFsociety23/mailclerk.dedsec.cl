import { Logger, NestMiddleware, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

export class CheckIfAdmin implements NestMiddleware {
    private logger: Logger = new Logger(CheckIfAdmin.name);
    use(@Req() request: Request, @Res() response: Response, next: () => void) {
        try {
            this.logger.log(`[ CheckIfAdmin() ]: Verificando perfil administrador`);
            const { authorization } = request.headers;
            const jwtData = JSON.parse(atob(authorization?.split(" ")[1].split(".")[1] as string));
            if (jwtData.profile == 'ADMIN') {
                this.logger.log(`[ CheckIfAdmin() ]: Perfil verificado con exito`);
                next();
            } else {
                this.logger.error(`[ CheckIfAdmin() ]: Perfil invalido`);
                response.status(401).json({ message: 'Perfil no valido', status: false });
            };
        } catch (error) {
            this.logger.error(`[ CheckIfAdmin() ]: Ha ocurrido un error al verificar el perfil ${error.message}`);
            throw error;
        };
    };
};
