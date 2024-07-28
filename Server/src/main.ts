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
    cookieParser(process.env.COOKIE_SECRET, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    }),
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
  await app.listen(3000);
}
bootstrap();
