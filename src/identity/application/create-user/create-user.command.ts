import { CreateUserDto } from 'src/identity/infrastructure/dto/create-user.dto';

export class CreateUserCommand {
  readonly userData: CreateUserDto;

  constructor(data: CreateUserDto) {
    this.userData = data;
  }
}
