import { Injectable, ExecutionContext, mixin } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

export function JwtAuthRoleGuard() {
  @Injectable()
  class JwtAuthWithRole extends AuthGuard('jwt') {
    constructor(readonly reflector: Reflector) {
      super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const isAuthenticated = (await super.canActivate(context)) as boolean;
      if (!isAuthenticated) return false;

      const rolesGuard = new RolesGuard(this.reflector);
      return rolesGuard.canActivate(context);
    }
  }

  return mixin(JwtAuthWithRole);
}
