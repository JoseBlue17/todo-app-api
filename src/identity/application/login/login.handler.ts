import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { loginQuery } from './login.query';
import { AuthService } from 'src/identity/infrastructure/auth.service';

@QueryHandler(loginQuery)
export class loginHandler implements IQueryHandler<loginQuery> {
  constructor(private readonly authService: AuthService) {}

  execute(query: loginQuery): Promise<any> {
    return this.authService.validateUser(query.loginInfo, {
      generateToken: true,
    });
  }
}
