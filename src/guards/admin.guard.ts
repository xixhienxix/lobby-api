import { Injectable } from '@nestjs/common';
import { AuthenticationGuard } from './auth.guard';

@Injectable()
export class AdminGuard extends AuthenticationGuard {
  constructor() {
    super(['ADMIN'] || ['USER']);
  }
}
