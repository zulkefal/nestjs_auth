import { IsEmail, MinLength } from "class-validator";

export class PasswordDTO {
    @MinLength(6)
    newPassword: string;

    @IsEmail()
    email: string;
}