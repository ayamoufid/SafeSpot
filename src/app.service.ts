import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  postLogin(username: string): string {
    return 'Hello ' + username;
  }
  getHello(): string {
    return 'Hello Aya lfenna!';
  }
}
