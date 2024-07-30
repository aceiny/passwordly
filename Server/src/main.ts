import {
  BaseExceptionFilter,
  NestFactory,
  HttpAdapterHost,
} from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    cookieParser(process.env.COOKIE_SECRET, /*{
      maxAge: 18000 * 1000, // 5 hours in milliseconds
      domain: 'axeiny.tech',
      path: '/',
      expires: new Date(Date.now() + 18000 * 1000),
      sameSite: 'none',
      secure: true, // Only sent over HTTPS
      httpOnly: false, // Not accessible via JavaScript
    }*/),
  );
  const config = new DocumentBuilder()
    .setTitle("survision")
    .setDescription("#")
    .setVersion("0.0")
    .addTag("#")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  await app.listen(3010);
}
bootstrap();
