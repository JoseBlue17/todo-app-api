import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from '../../infrastructure/schemas/task.schema';
import { GetUserTasksQuery } from './get-user-tasks.query';

@QueryHandler(GetUserTasksQuery)
export class GetUserTasksHandler implements IQueryHandler<GetUserTasksQuery> {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async execute(query: GetUserTasksQuery) {
    return this.taskModel
      .find({ userId: new Types.ObjectId(query.userId) }) //userId a ObjectId
      .sort({ createdAt: +1 }) // Antiguas primero (-1 para mas reciente)
      .exec();
  }
}
