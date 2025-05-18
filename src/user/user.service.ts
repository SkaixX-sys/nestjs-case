import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDTO } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userRepository: typeof User) { }

    async hashPassword(password: string) {
        return bcrypt.hash(password, 10)
    }

    async createUser(dto: any): Promise<CreateUserDTO> {
        dto.password = await this.hashPassword(dto.password)
        await this.userRepository.create(dto)
        return dto
    }
}
