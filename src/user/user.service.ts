import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { ApiError } from 'src/common/erorrs';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userRepository: typeof User) { }

    async hashPassword(password: string) {
        return bcrypt.hash(password, 10)
    }

    async findUserByEmail(email: string) {
        return this.userRepository.findOne({ where: { email: email } })
    }

    async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
        const checkUser = await this.findUserByEmail(dto.email)
        if (checkUser) throw new BadRequestException(ApiError.USER_EXIST)
        dto.password = await this.hashPassword(dto.password)
        await this.userRepository.create({
            login: dto.login,
            email: dto.email,
            password: dto.password
        })
        return dto
    }
}
