import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("registration")
    registerUser(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
        return this.authService.registerUser(dto)
    }

    @Post("login")
    loginUser(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
        console.log("BODY DTO:" + dto.password);
        
        return this.authService.loginUser(dto)
    }

}
