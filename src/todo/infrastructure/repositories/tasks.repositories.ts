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

  async createTask(task: DomainTask): Promise<DomainTask> {
    const createdTask = new this.taskModel({
      title: task.title,
      description: task.description,
      completed: task.completed,
      category: task.category,
      dueDate: task.dueDate,
      userId: new Types.ObjectId(task.userId),
    });
    const result = await createdTask.save();
    return DomainTask.fromDocument(result);
  }
}
