import { Controller, Get } from '@nestjs/common';

@Controller()
export class LoginController {
  @Get('/api/login')
  async login(): Promise<any> {
    return;
  }
}
