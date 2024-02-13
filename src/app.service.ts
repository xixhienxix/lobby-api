import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): string {
    return 'API ACtive!';
  }
  getVersion(): string {
    return 'v.2.2 31/01/2023!';
  }
}
