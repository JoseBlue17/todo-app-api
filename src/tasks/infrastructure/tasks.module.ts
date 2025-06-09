import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { CreateTaskHandler } from '../application/create-tasks/create-task.handler';
import { GetTasksHandler } from '../application/get-tasks/get-tasks.handler';

import { TaskRepository } from './repositories/tasks.repositories';
import { Task, TaskSchema } from './schemas/task.schema';
import { TaskSearchService } from './services/task-search.service';
import { TasksController } from './tasks.controller';
import { UpdateTaskHandler } from '../application/update-tasks/update-tasks.handler';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [TasksController],
  providers: [
    CreateTaskHandler,
    GetTasksHandler,
    TaskRepository,
    TaskSearchService,
    UpdateTaskHandler,
  ],
})
export class TasksModule {}
