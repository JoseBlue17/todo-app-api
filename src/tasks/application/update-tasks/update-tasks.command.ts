export class UpdateTaskCommand {
  readonly userId: string;
  readonly taskId: string;
  readonly title?: string;
  readonly description?: string;
  readonly completed?: boolean;
  readonly category?: string;
  readonly dueDate?: Date;

  constructor(params: UpdateTaskCommand) {
    Object.assign(this, params);
  }
}
