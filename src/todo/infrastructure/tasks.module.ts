import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { ITaskRepository } from '../domain/repositories/task.repository.interface';

import { GetUserTasksHandler } from '../application/get-tasks/get-user-tasks.handler';

import { TasksController } from './tasks.controller';
import { Task, TaskSchema } from './schemas/task.schema';
import { TaskRepository } from './repositories/tasks.repositories';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [TasksController],
  providers: [
    GetUserTasksHandler,
    {
      provide: ITaskRepository,
      useClass: TaskRepository,
    },
  ],
})
export class TasksModule {}
