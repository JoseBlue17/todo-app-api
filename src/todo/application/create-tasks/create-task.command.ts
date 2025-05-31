import { ICommand } from '@nestjs/cqrs';

export class CreateTaskCommand implements ICommand {
  constructor(
    public readonly title: string,
    public readonly description: string | null,
    public readonly completed: boolean | null,
    public readonly category: string | null,
    public readonly dueDate: Date | null,
    public readonly userId: string,
  ) {}
}
