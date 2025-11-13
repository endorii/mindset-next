import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");
    app.enableCors({
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    });

    app.use(cookieParser());

    app.use("/stripe/webhook", express.raw({ type: "application/json" }));

    app.use(express.json());

    const config = new DocumentBuilder()
        .setTitle("Mindset API")
        .setDescription("API Docs")
        .setVersion("1.0")
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        })
    );
    await app.listen(5000);
}

bootstrap();
