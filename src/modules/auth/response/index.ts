import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsEmail } from "class-validator"

export class AuthUserResponse {
    @ApiProperty()
    @IsString()
    login: string

    @IsString()
    @ApiProperty()
    @IsEmail()
    email: string
    
    @IsString()
    @ApiProperty()
    token: string
}