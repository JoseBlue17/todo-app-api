export class DeleteTaskCommand {
  readonly userId: string;
  readonly taskId: string;

  constructor(params: DeleteTaskCommand) {
    Object.assign(this, params);
  }
}
