import { Controller, Get, Req, Post, Body } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';

import { CreateTaskDto } from '../infrastructure/dto/task.dto';

import { GetUserTasksQuery } from '../application/get-tasks/get-user-tasks.query';
import { CreateTaskCommand } from '../application/create-tasks/create-task.command';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('/')
  async getUserTasks(@Req() req: any) {
    return this.queryBus.execute(new GetUserTasksQuery(req.user.id));
  }

  @Post('/')
  async createTask(@Body() createTaskDto: CreateTaskDto, @Req() req: any) {
    const command = new CreateTaskCommand(
      createTaskDto.title,
      createTaskDto.description,
      createTaskDto.completed,
      createTaskDto.category,
      createTaskDto.dueDate,
      req.user.id,
    );
    return this.commandBus.execute(command);
  }
}
