import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userSerive: UserService) { }

    @Post('create-user')
    createUser(@Body() dto: CreateUserDTO) {
        return this.userSerive.createUser(dto)
    }

    @Get('get-users')
    async getUsers() {
        return await this.userSerive.getUsers()
    }
}
