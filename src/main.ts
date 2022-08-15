import { INestApplication, ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

import { AppModule } from "./app.module"

function configureSwaggerModule(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("Code assessment backend")
    .setDescription("Swagger documentation")
    .setVersion("1.0")
    .addTag("statistics")
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  configureSwaggerModule(app)

  await app.listen(3000)
}
bootstrap()
