import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDTO } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userRepository: typeof User) { }

    async getUsers() {
        return await this.userRepository.findAll()
    }

    async hashPassword(password: string) {
        return await bcrypt.hash(password, 10)
    }

    async findUserByEmail(email: string) {
        return this.userRepository.findOne({
            where: { email: email },
            raw: true
        })
    }

    async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
        const hashedPassword = await this.hashPassword(dto.password)
        await this.userRepository.create({
            login: dto.login,
            email: dto.email,
            password: hashedPassword
        })
        return dto
    }
}
