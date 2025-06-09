import {
  Controller,
  Get,
  Post,
  Patch,
  Req,
  Body,
  Query,
  Param,
} from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { CreateTaskCommand } from '../application/create-tasks/create-task.command';
import { GetTasksQuery } from '../application/get-tasks/get-tasks.query';
import { UpdateTaskCommand } from '../application/update-tasks/update-tasks.command';

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

  @Patch('/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: any,
  ) {
    const command = new UpdateTaskCommand({
      ...updateTaskDto,
      userId: req.user.id,
      taskId: id,
    });
    return this.commandBus.execute(command);
  }
}
