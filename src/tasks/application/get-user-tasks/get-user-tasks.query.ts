export class GetUserTasksQuery {
  constructor(
    readonly userId: string,
    readonly filters?: {
      terms?: string;
      cursor?: string;
      size?: number;
    },
    readonly select?: { [key: string]: boolean },
  ) {}
}
