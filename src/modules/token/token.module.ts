import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [TokenService, ConfigService, JwtService],
  exports: [TokenService],
})
export class TokenModule { }
