import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Task, TaskDocument } from '../schemas/task.schema';

interface GetTasksFilters {
  title?: string;
  description?: string;
  cursor?: string;
}

interface CreateTaskPayload {
  title: string;
  description?: string | null;
  completed: boolean;
  category: string;
  dueDate?: Date | null;
  userId: string;
}

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async getTasks(userId: string, filters?: GetTasksFilters) {
    const userIdObjectId = new Types.ObjectId(userId);
    const query: any = { userId: userIdObjectId };

    if (filters?.cursor) {
      query._id = { $gt: new Types.ObjectId(filters.cursor) };
    }

    const orConditions = [];

    if (filters?.title) {
      orConditions.push({ title: { $regex: filters.title, $options: 'i' } });
    }

    if (filters?.description) {
      orConditions.push({
        description: { $regex: filters.description, $options: 'i' },
      });
    }

    if (orConditions.length > 0) {
      query.$or = orConditions;
    }

    const tasks = this.taskModel.find(query).sort({ _id: 1 }).exec();

    return tasks;
  }

  async createTask(data: CreateTaskPayload) {
    if (!data.title?.trim()) {
      throw new Error('Title is required and cannot be empty');
    }

    if (!Types.ObjectId.isValid(data.userId)) {
      throw new Error('Invalid userId format');
    }

    const createdTask = new this.taskModel({
      title: data.title,
      description: data.description,
      completed: data.completed,
      category: data.category,
      dueDate: data.dueDate,
      userId: new Types.ObjectId(data.userId),
    });

    const result = await createdTask.save();
    return result;
  }
}
