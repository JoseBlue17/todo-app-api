export class GetTasksQuery {
  constructor(
    readonly userId: string,
    readonly filters?: {
      title?: string;
      description?: string;
      cursor?: string;
    },
  ) {}
}
