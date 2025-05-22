import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto';
import { UserService } from './user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("UserAPI")
@Controller('users')
export class UserController {
    constructor(private readonly userSerive: UserService) { }

    @Post('create-user')
    @ApiResponse({ status: 201, type: CreateUserDTO })
    createUser(@Body() dto: CreateUserDTO) {
        return this.userSerive.createUser(dto)
    }

    @Get('get-users')
    async getUsers() {
        return await this.userSerive.getUsers()
    }
}
