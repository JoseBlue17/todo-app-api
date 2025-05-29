import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

import { GetUserTasksQuery } from '../application/get-tasks/get-user-tasks.query';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async getUserTasks(@Request() req) {
    return this.queryBus.execute(new GetUserTasksQuery(req.user.userId));
  }
}
