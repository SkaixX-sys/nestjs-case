import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { UserService } from './user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { jwtAuthGuard } from 'src/guards/jwt-guard';

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
    getUsers() {
        return this.userSerive.getUsers()
    }

    @Patch('update-user')
    @UseGuards(jwtAuthGuard)
    updateUser(@Body() updateDto: UpdateUserDTO, @Req() request) {
        const user = request.user
        return this.userSerive.updateUser(user.email, updateDto)
    }

    @Patch('delete-user')
    @UseGuards(jwtAuthGuard)
    deleteUser(@Req() request): Promise<boolean> {
        const user = request.user
        return this.userSerive.deleteUser(user.email)
    }
}
