import { BadRequestException, Injectable } from '@nestjs/common';
import { ApiError } from 'src/common/erorrs';
import { CreateUserDTO } from 'src/modules/user/dto';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from "bcrypt"
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService
    ) { }

    async registerUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
        const checkUser = await this.userService.findUserByEmail(dto.email)
        if (checkUser) throw new BadRequestException(ApiError.USER_EXIST)
        return await this.userService.createUser(dto)
    }

    async loginUser(dto: UserLoginDTO): Promise<AuthUserResponse> {
        const existUser = await this.userService.findUserByEmail(dto.email)
        if (!existUser) throw new BadRequestException(ApiError.USER_NOT_EXIST)

        const validatePassword = await bcrypt.compare(dto.password, existUser.password)
        if (!validatePassword) throw new BadRequestException(ApiError.WRONG_DATA)

        const token = await this.tokenService.generateJwtToken(dto.email)
        const user = await this.userService.publicUser(dto.email)
        if (!user) throw new BadRequestException(ApiError.USER_NOT_EXIST)
        
        return {
            login: user.login,
            email: user.email,
            token,
        }
    }
}
