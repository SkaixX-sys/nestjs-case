import { BadRequestException, Injectable } from '@nestjs/common';
import { ApiError } from 'src/common/erorrs';
import { CreateUserDTO } from 'src/user/dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }

    async registerUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
        const checkUser = await this.userService.findUserByEmail(dto.email)
        if (checkUser) throw new BadRequestException(ApiError.USER_EXIST)
        return await this.userService.createUser(dto)
    }

    async loginUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
        const existUser = await this.userService.findUserByEmail(dto.email)
        if (!existUser) throw new BadRequestException(ApiError.USER_NOT_EXIST)
        const validatePassword = await bcrypt.compare(dto.password, existUser.password)
        if (!validatePassword) throw new BadRequestException(ApiError.WRONG_DATA)

        return existUser
    }
}
