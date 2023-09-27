import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';


dotenv.config();
async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser()); // Utilisez cookie-parser comme middleware global
    await app.listen(3000);
  } catch (error) {
    console.log("Error in main");
  }
}
bootstrap();
