import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from '../schemas/task.schema';
import { Task as DomainTask } from '../../domain/task.model';
import { ITaskRepository } from '../../domain/repositories/task.repository.interface';

@Injectable()
export class TaskRepository implements ITaskRepository {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async findByUserId(userId: string): Promise<DomainTask[]> {
    const tasks = await this.taskModel
      .find({ userId: new Types.ObjectId(userId) })
      .exec();
    return tasks.map(task => DomainTask.fromDocument(task));
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
