import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Recaptcha } from '@nestlab/google-recaptcha';

import { Public } from 'src/shared/validation';

import { CreateUserCommand } from '../application/create-user/create-user.command';
import { LoginQuery } from '../application/login/login.query';

import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('/sign-up')
  @Public()
  @Recaptcha()
  async signUp(@Body() body: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(body));
  }

  @Post('/login')
  @Public()
  async login(@Body() body: LoginDto) {
    const loginCredentials = { email: body.email, password: body.password };
    return this.queryBus.execute(new LoginQuery(loginCredentials));
  }
}
