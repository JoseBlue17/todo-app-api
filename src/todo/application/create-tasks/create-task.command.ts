import { ICommand } from '@nestjs/cqrs';

export class CreateTaskCommand implements ICommand {
  readonly title: string;
  readonly description?: string;
  readonly completed?: boolean;
  readonly category?: string;
  readonly dueDate?: Date;
  readonly userId: string;

  constructor(params: CreateTaskCommand) {
    Object.assign(this, params);
  }
}
