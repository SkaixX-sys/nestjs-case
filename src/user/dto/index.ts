import { IsEmail, IsString } from "class-validator"

export class CreateUserDTO {
    @IsString()
    login: string

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    password: string
}