import { ICommand } from '@nestjs/cqrs';

export class CreateTaskCommand implements ICommand {
  constructor(
    public readonly title: string,
    public readonly description: string | undefined,
    public readonly completed: boolean,
    public readonly category: string | undefined,
    public readonly dueDate: string | undefined,
    public readonly userId: string,
  ) {}
}
