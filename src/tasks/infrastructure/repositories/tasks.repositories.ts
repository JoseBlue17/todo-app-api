import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Task, TaskDocument } from '../schemas/task.schema';

interface CreateTaskPayload {
  title: string;
  description?: string | null;
  completed: boolean;
  category: string;
  dueDate?: Date | null;
  userId: string;
}

interface UpdateTaskPayload {
  title?: string;
  description?: string | null;
  completed?: boolean;
  category?: string | null;
  dueDate?: Date | null;
  userId: string;
  taskId: string;
}

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async findByUserId(userId: string) {
    return this.taskModel.find({ userId: new Types.ObjectId(userId) }).exec();
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

    return createdTask.save();
  }

  async updateTask(taskData: UpdateTaskPayload) {
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
