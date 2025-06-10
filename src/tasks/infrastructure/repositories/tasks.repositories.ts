import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Task, TaskDocument, ITask } from '../schemas/task.schema';

type CreateTaskPayload = Omit<ITask, 'userId'> & { userId: string };

type UpdateTaskPayload = {
  taskId: string;
  userId: string;
  title?: string;
  description?: string | null;
  completed?: boolean;
  category?: string | null;
  dueDate?: Date | null;
};

type SearchTaskFilters = {
  userId: string;
  terms?: string;
  cursor?: string;
  size?: number;
};

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
    return this.taskModel.create({
      ...data,
      userId: new Types.ObjectId(data.userId),
    });
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
    return updatedTask;
  }

  async searchTasks(filters: SearchTaskFilters) {
    let query = this.taskModel.find({
      userId: new Types.ObjectId(filters.userId),
    });

    if (filters.terms) {
      query = query.merge({
        $or: [
          { title: { $regex: filters.terms, $options: 'i' } },
          { description: { $regex: filters.terms, $options: 'i' } },
        ],
      });
    }

    if (filters.cursor) {
      query = query.merge({ _id: { $gt: new Types.ObjectId(filters.cursor) } });
    }

    const tasks = await query.limit(filters.size).sort({ _id: 1 }).exec();

    return {
      tasks,
      cursor: tasks.length > 0 ? tasks[tasks.length - 1]._id : undefined,
    };
  }
}
