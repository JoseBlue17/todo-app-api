import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { CreateUserHandler } from '../application/create-user/create-user.handler';
import { LoginHandler } from '../application/login/login.handler';

import { HashService } from 'src/shared/hash';
import { ClientRouteBuilder } from 'src/shared/utils';

import { User, UserSchema } from './schemas/user.schema';
import { UserRepository } from './repositories/user.repository';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    ConfigModule,
    CqrsModule,
    JwtModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    AuthService,
    ClientRouteBuilder,
    HashService,
    CreateUserHandler,
    UserRepository,
    LoginHandler,
  ],
  exports: [UserRepository],
})
export class IdentityModule {}
