import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { CreateTaskHandler } from '../application/create-tasks/create-task.handler';
import { GetTasksHandler } from '../application/get-tasks/get-tasks.handler';

import { TasksController } from './tasks.controller';
import { Task, TaskSchema } from './schemas/task.schema';
import { TaskRepository } from './repositories/tasks.repositories';
import { TaskIndexerService } from './services/task-indexer.service';

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
    TaskIndexerService,
  ],
})
export class TasksModule {}
