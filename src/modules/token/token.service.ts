import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDTO } from '../auth/dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,

    ) { }
    async generateJwtToken(user) {
        const payload = {
            email: user.email,
            login: user.login,
        };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get("jwt_secret"),
            expiresIn: this.configService.get("jwt_expiresIn") + "s",
        })
        return token
    }
}
