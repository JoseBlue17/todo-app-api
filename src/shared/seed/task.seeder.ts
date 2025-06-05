import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  User,
  UserDocument,
} from '../../identity/infrastructure/schemas/user.schema';

import {
  Task,
  TaskDocument,
} from '../../tasks/infrastructure/schemas/task.schema';

@Injectable()
export class TaskSeeder {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async drop() {
    await this.taskModel.deleteMany({});
  }

  async seed() {
    const user = await this.userModel.findOne();
    if (!user) {
      throw new Error(
        'No hay usuarios en la base de datos para asociar tareas',
      );
    }

    await this.taskModel.insertMany([
      {
        title: 'Tarea de ejemplo',
        description: 'Ejemplo',
        completed: false,
        dueDate: new Date(),
        category: '#FF0000',
        userId: user._id,
      },
    ]);
  }
}
