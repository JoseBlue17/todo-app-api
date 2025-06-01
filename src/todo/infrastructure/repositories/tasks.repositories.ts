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

  async updateTask(taskData: {
    title?: string;
    description?: string | null;
    completed?: boolean;
    category?: string | null;
    dueDate?: Date | null;
    userId: string;
    taskId: string;
  }): Promise<TaskDocument> {
    const taskIdObjectId = new Types.ObjectId(taskData.taskId);
    const userIdObjectId = new Types.ObjectId(taskData.userId);

    const updatedTask = await this.taskModel.findOneAndUpdate(
      { _id: taskIdObjectId, userId: userIdObjectId },
      {
        title: taskData.title,
        description: taskData.description,
        completed: taskData.completed,
        category: taskData.category,
        dueDate: taskData.dueDate,
      },
      { new: true },
    );
    return updatedTask;
  }
}
