import {
  Controller,
  Get,
  Req,
  Post,
  Body,
  Query,
  Patch,
  Param,
} from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';

import { GetUserTasksQuery } from '../application/get-tasks/get-user-tasks.query';
import { CreateTaskCommand } from '../application/create-tasks/create-task.command';
import { SearchTasksQuery } from '../application/search-tasks/search-tasks.query';
import { UpdateTaskCommand } from '../application/update-tasks/update-tasks.command';

import { CreateTaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterSearchTasksDto } from './dto/filter-search-tasks.dto';

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

  @Get('/search')
  async searchTasks(@Query() query: FilterSearchTasksDto, @Req() req: any) {
    return this.queryBus.execute(new SearchTasksQuery(query, req.user.id));
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

  @Patch('/:id')
  async updateTask(
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: any,
    @Param('id') id: string,
  ) {
    const command = new UpdateTaskCommand(
      updateTaskDto.title,
      updateTaskDto.description,
      updateTaskDto.completed,
      updateTaskDto.category,
      updateTaskDto.dueDate,
      req.user.id,
      id,
    );
    return this.commandBus.execute(command);
  }
}
