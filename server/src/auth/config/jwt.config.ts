import { ConfigService } from "@nestjs/config";

export const accessJwtOptions = (config: ConfigService) => ({
    secret: config.get<string>("ACCESS_TOKEN_SECRET"),
    signOptions: { expiresIn: config.get<string>("ACCESS_TOKEN_EXPIRES") || "15m" },
});

export const refreshJwtOptions = (config: ConfigService) => ({
    secret: config.get<string>("REFRESH_TOKEN_SECRET"),
    signOptions: { expiresIn: config.get<string>("REFRESH_TOKEN_EXPIRES") || "7d" },
});
