import { RoleEnum } from '@libs/constant';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { roleEnum } from '../../../common/constants/enum';
import { ROLE_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<RoleEnum>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRole) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (user?.role < requiredRole)
      throw new ForbiddenException({
        error: [
          `your role must be greater than or equal to '${roleEnum[requiredRole]}'`,
        ],
      });

    return true;
  }
}
