import { Controller, Get, Request } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetUserTasksQuery } from '../application/get-tasks/get-user-tasks.query';

@Controller('tasks')
export class TasksController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('/')
  async getUserTasks(@Request() req: any) {
    return this.queryBus.execute(new GetUserTasksQuery(req.user.id));
  }
}
