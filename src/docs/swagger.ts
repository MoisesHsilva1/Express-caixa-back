import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('API EXPRESS-CAIXA')
    .setDescription(
      'API responsável por gerenciar as informações sobre o sistema de caixa de pequenas empresas',
    )
    .setVersion('1.0')
    .addTag('Rotas')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('Api', app, document);
}
