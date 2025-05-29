import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from '../schemas/task.schema';
import { Task as DomainTask } from '../../domain/task.model';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async findByUserId(userId: string): Promise<DomainTask[]> {
    const tasks = await this.taskModel.find({ userId: new Types.ObjectId(userId) }).exec();
    return tasks.map(task => DomainTask.fromDocument(task));
  }
}
