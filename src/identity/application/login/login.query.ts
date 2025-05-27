import { IQuery } from '@nestjs/cqrs';
import { LoginDto } from '../../infrastructure/dto/login.dto';

export class loginQuery implements IQuery {
  readonly loginInfo: LoginDto;

  constructor(loginInfo: LoginDto) {
    this.loginInfo = loginInfo;
  }
}
