import { IsEmail, IsString, MinLength } from "class-validator";

export class SignupDTO {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
}