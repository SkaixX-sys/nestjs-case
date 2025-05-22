import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class CreateUserDTO {
    
    @ApiProperty()
    @IsString()
    login: string

    @IsString()
    @ApiProperty()
    @IsEmail()
    email: string

    @IsString()
    @ApiProperty()
    password: string
}