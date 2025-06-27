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
import { ApiBearerAuth } from '@nestjs/swagger';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetUserTasksDto } from './dto/get-user-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { CreateTaskCommand } from '../application/create-tasks/create-task.command';
import { GetUserTasksQuery } from '../application/get-user-tasks/get-user-tasks.query';
import { UpdateTaskCommand } from '../application/update-tasks/update-tasks.command';

@Controller('tasks')
@ApiBearerAuth()
export class TasksController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('/')
  async getTasks(@Query() filters: GetUserTasksDto, @Req() req: any) {
    return this.queryBus.execute(new GetUserTasksQuery(req.user.id, filters));
  }

  @Post('/')
  async createTask(@Body() body: CreateTaskDto, @Req() req: any) {
    const command = new CreateTaskCommand({
      ...body,
      userId: req.user.id,
    });
    return this.commandBus.execute(command);
  }

  @Patch('/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() body: UpdateTaskDto,
    @Req() req: any,
  ) {
    const command = new UpdateTaskCommand({
      ...body,
      userId: req.user.id,
      taskId: id,
    });
    return this.commandBus.execute(command);
  }
}
