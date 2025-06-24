import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/user/enum/role.enum";
import { ROLES_KEY } from "./roles.decorator";
import { AppUser } from "src/user/types/user";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest<{ user: AppUser }>();
        const user = request.user;

        if (!user) {
            throw new ForbiddenException("Користувач не автентифікований");
        }

        if (!requiredRoles.includes(user.role)) {
            throw new ForbiddenException("У вас немає необхідних прав доступу");
        }

        return true;
    }
}
