import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LoginQuery } from './login.query';
import { AuthService } from '../../infrastructure/auth.service';

@QueryHandler(LoginQuery)
export class LoginHandler implements IQueryHandler<LoginQuery> {
  constructor(private readonly authService: AuthService) {}

  execute(query: LoginQuery) {
    return this.authService.validateUser(query.loginInfo, {
      generateToken: true,
    });
  }
}
