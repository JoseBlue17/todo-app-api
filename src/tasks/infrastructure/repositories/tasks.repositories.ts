import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Task, TaskDocument } from '../schemas/task.schema';

type CreateTaskData = {
  title: string;
  description?: string;
  completed: boolean;
  category: string;
  dueDate?: Date;
  userId: string;
};

type UpdateTaskPayload = {
  taskId: string;
  userId: string;
  title?: string;
  description?: string;
  completed?: boolean;
  category?: string;
  dueDate?: Date;
};

type TaskFilters = {
  userId: string;
  terms?: string;
  cursor?: string;
  size?: number;
};

type TaskSelect = { [key in keyof TaskDocument]?: boolean };

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async findByUserId(userId: string) {
    return this.taskModel.find({ userId: new Types.ObjectId(userId) }).exec();
  }

  async createTask(data: CreateTaskData) {
    return this.taskModel.create(data);
  }

  async updateTask(taskData: UpdateTaskPayload) {
    const { taskId, userId, ...updateFields } = taskData;

    const updatedTask = await this.taskModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(taskId),
        userId: new Types.ObjectId(userId),
      },
      {
        ...updateFields,
      },
      { new: true },
    );
    if (!updatedTask) {
      throw new Error('Task not found');
    }
    return updatedTask;
  }

  async searchTasks(filters: TaskFilters, select?: TaskSelect) {
    const query = this.taskModel.find({
      userId: new Types.ObjectId(filters.userId),
    });

    if (filters.terms) {
      query.merge({
        $or: [
          { title: { $regex: filters.terms, $options: 'i' } },
          { description: { $regex: filters.terms, $options: 'i' } },
        ],
      });
    }

    if (filters.cursor) {
      query.merge({ _id: { $gt: new Types.ObjectId(filters.cursor) } });
    }

    if (filters.size) {
      query.limit(filters.size);
    }

    const tasks = await query.select(select).sort({ _id: 1 }).exec();

    return {
      tasks,
      cursor: tasks.length > 0 ? tasks[tasks.length - 1]._id : undefined,
    };
  }
}
