import { Controller, Get, Req, Post, Body, Query } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';

import { GetTasksQuery } from '../application/get-tasks/get-tasks.query';
import { CreateTaskCommand } from '../application/create-tasks/create-task.command';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('/')
  async getTasks(@Query() filters: GetTasksDto, @Req() req: any) {
    return this.queryBus.execute(new GetTasksQuery(req.user.id, filters));
  }

  @Post('/')
  async createTask(@Body() createTaskDto: CreateTaskDto, @Req() req: any) {
    const command = new CreateTaskCommand({
      ...createTaskDto,
      userId: req.user.id,
    });
    return this.commandBus.execute(command);
  }
}
