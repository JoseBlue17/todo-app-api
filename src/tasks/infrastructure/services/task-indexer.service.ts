import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Task, TaskDocument } from '../schemas/task.schema';

export type SearchTaskFilters = {
  userId: string;
  terms?: string;
  cursor?: string;
  size?: number;
};

@Injectable()
export class TaskIndexerService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async searchTasks(filters: SearchTaskFilters) {
    const query: any = { userId: new Types.ObjectId(filters.userId) };

    if (filters.terms) {
      query.$or = [
        { title: { $regex: filters.terms, $options: 'i' } },
        { description: { $regex: filters.terms, $options: 'i' } },
      ];
    }

    if (filters.cursor) {
      query._id = { $gt: new Types.ObjectId(filters.cursor) };
    }

    const tasks = await this.taskModel
      .find(query)
      .limit(filters.size || 10)
      .sort({ createdAt: -1 })
      .exec();

    return {
      tasks,
      cursor:
        tasks.length > 0 ? tasks[tasks.length - 1]._id.toString() : undefined,
    };
  }
}
