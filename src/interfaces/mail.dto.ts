import { IsEmail, IsString } from "class-validator";

export class MessageEmailDTO {
    @IsString()
    name: string;

    @IsString()
    subject: string;

    @IsEmail()
    reciever: string;

    @IsString()
    content: string;
};

export class WelcomeEmailDTO {
    @IsString()
    name: string;
    
    @IsEmail()
    reciever: string;
};
