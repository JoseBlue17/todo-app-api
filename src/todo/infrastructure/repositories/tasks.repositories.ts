import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Task, TaskDocument } from '../schemas/task.schema';

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

  async createTask(taskData: {
    title: string;
    description?: string | null;
    completed: boolean;
    category?: string | null;
    dueDate?: Date | null;
    userId: string;
  }): Promise<TaskDocument> {
    const createdTask = new this.taskModel({
      title: taskData.title,
      description: taskData.description,
      completed: taskData.completed,
      category: taskData.category,
      dueDate: taskData.dueDate,
      userId: new Types.ObjectId(taskData.userId),
    });
    const result = await createdTask.save();
    return result;
  }
}
