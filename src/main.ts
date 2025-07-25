import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())

  const configService = app.get(ConfigService)
  const port = configService.get("port")
  const config = new DocumentBuilder()
    .setTitle("SwaggerNestTest")
    .addTag("API")
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)
  await app.listen(port ?? 3000);
}
bootstrap();
