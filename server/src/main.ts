import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use("/api/stripe/webhook", express.raw({ type: "application/json" }));

    app.use(express.json());
    app.use(cookieParser());

    app.setGlobalPrefix("api");

    app.enableCors({
        origin: ["http://localhost:3000", "https://mindset-client.onrender.com"],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        })
    );

    const config = new DocumentBuilder()
        .setTitle("Mindset API")
        .setDescription("API Docs")
        .setVersion("1.0")
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);

    const port = process.env.PORT || 5000;
    await app.listen(port, "0.0.0.0");

    console.log(`🚀 Application is running on: http://localhost:${port}`);
    // console.log(`📚 Swagger docs available at: http://localhost:${port}/docs`);
}

bootstrap();
