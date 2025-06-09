export class UpdateTaskCommand {
  readonly userId: string;
  readonly taskId: string;
  readonly title?: string;
  readonly description?: string | null;
  readonly completed?: boolean | null;
  readonly category?: string | null;
  readonly dueDate?: Date | null;

  constructor(params: UpdateTaskCommand) {
    Object.assign(this, params);
  }
}
