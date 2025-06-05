export class CreateTaskCommand {
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
