import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { CreateTaskHandler } from '../application/create-tasks/create-task.handler';
import { GetUserTasksHandler } from '../application/get-user-tasks/get-user-tasks.handler';
import { UpdateTaskHandler } from '../application/update-tasks/update-tasks.handler';

import { TaskRepository } from './repositories/tasks.repositories';
import { Task, TaskSchema } from './schemas/task.schema';
import { TasksController } from './tasks.controller';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [TasksController],
  providers: [
    CreateTaskHandler,
    GetUserTasksHandler,
    TaskRepository,
    UpdateTaskHandler,
  ],
})
export class TasksModule {}
