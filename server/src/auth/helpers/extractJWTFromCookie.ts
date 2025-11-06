import { Request } from "express";

export const extractAccessTokenFromCookie = (req: Request): string | null => {
    if (req.cookies && req.cookies.accessToken) {
        return String(req.cookies.accessToken);
    }
    return null;
};

export const extractRefreshTokenFromCookie = (req: Request): string | null => {
    if (req.cookies && req.cookies.refreshToken) {
        return String(req.cookies.refreshToken);
    }
    return null;
};
