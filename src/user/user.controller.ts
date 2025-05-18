import { Body, Controller } from '@nestjs/common';
import { CreateUserDTO } from './dto';

@Controller('user')
export class UserController {
    constructor() { }

    createUser(@Body() dto: CreateUserDTO) {

    }
}
