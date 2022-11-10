import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function initSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('MineMMO')
    .setDescription('MineMMO API Documentation.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
