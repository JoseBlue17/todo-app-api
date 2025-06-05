import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Task, TaskDocument } from '../schemas/task.schema';
import { FilterSearchTasksDto } from '../dto/filter-search-tasks.dto';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async findByUserId(userId: string): Promise<TaskDocument[]> {
    const userIdObjectId = new Types.ObjectId(userId);

    const tasks = await this.taskModel.find({ userId: userIdObjectId }).exec();
    return tasks;
  }

  async searchTasks(
    filters: FilterSearchTasksDto,
    userId: string,
  ): Promise<TaskDocument[]> {
    const userIdObjectId = new Types.ObjectId(userId);
    const query: any = { userId: userIdObjectId };

    if (filters.title || filters.description) {
      query.$or = [];

      if (filters.title) {
        query.$or.push({ title: { $regex: filters.title, $options: 'i' } });
      }

      if (filters.description) {
        query.$or.push({
          description: { $regex: filters.description, $options: 'i' },
        });
      }
    }

    const tasks = await this.taskModel.find(query).exec();

    return tasks;
  }

  async createTask({
    title,
    description,
    completed,
    category,
    dueDate,
    userId,
  }: {
    title: string;
    description?: string | null;
    completed: boolean;
    category: string;
    dueDate?: Date | null;
    userId: string;
  }) {
    if (!title?.trim()) {
      throw new Error('Title is required and cannot be empty');
    }

    if (!Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid userId format');
    }

    const createdTask = new this.taskModel({
      title,
      description,
      completed,
      category,
      dueDate,
      userId: new Types.ObjectId(userId),
    });
    const result = await createdTask.save();
    return result;
  }
}
