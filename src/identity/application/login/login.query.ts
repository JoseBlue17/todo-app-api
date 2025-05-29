import { LoginDto } from '../../infrastructure/dto/login.dto';
import { LoginCredentials } from '../../infrastructure/auth.service';

export class LoginQuery {
  readonly loginInfo: LoginCredentials;

  constructor(loginInfo: LoginCredentials) {
    this.loginInfo = loginInfo;
  }
}
