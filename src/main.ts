import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './docs/swagger';
import { HttpExceptionFilter } from './commom/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    origin: '*',
  });
  await app.listen(process.env.PORT_SERVER ?? 3000);
}

bootstrap().catch((err) => {
  console.error('Error in start server', err);
});
