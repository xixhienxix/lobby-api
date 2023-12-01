import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private allowedRoles: string[]) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const host = context.switchToHttp(),
      request = host.getRequest();

    const user = request['user'];

    const allowed = this.isAllowed(user.rol);
    if (!allowed) {
      throw new ForbiddenException();
    }
    return true;
  }

  isAllowed(userRoles: string[]) {
    let allowed = false;
    userRoles.forEach((userRol) => {
      if (!allowed && this.allowedRoles.includes(userRol)) {
        allowed = true;
      }
    });
    return allowed;
  }
}
