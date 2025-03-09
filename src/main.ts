import { NestFactory } from '@nestjs/core';
import { MailclerkModule } from './modules/mailclerk.module';

async function bootstrap() {
  const app = await NestFactory.create(MailclerkModule);
  await app.listen(process.env.PORT ?? 2500);
};
bootstrap();
