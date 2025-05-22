import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from 'src/modules/user/dto';
import { AuthService } from './auth.service';
import { UserLoginDTO } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { jwtAuthGuard } from 'src/guards/jwt-guard';
import { AuthUserResponse } from './response';

@ApiTags("AuthAPI")
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("registration")
    @ApiResponse({ status: 201, type: CreateUserDTO })
    registerUser(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
        return this.authService.registerUser(dto)
    }

    @Post("login")
    @ApiResponse({ status: 200, type: AuthUserResponse })
    loginUser(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
        return this.authService.loginUser(dto)
    }

@Post("test")
@UseGuards(jwtAuthGuard)
test(){
    return true
}

}
