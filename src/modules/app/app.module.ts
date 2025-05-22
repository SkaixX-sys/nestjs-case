import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../../config';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/user/models/user.model';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [config]
  }),
  SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      dialect: "postgres",
      host: configService.get("db_host"),
      port: configService.get("db_port"),
      username: configService.get("db_user"),
      password: configService.get("db_password"),
      database: configService.get("db_name"),
      synchronize: true,
      autoLoadModels: true,
      models: [User]
    })
  }),
    UserModule,
    AuthModule,
    TokenModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
