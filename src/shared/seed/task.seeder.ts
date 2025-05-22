import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import {
  Task,
  TaskDocument,
} from '../../todo/infrastructure/schemas/task.schema';
import {
  User,
  UserDocument,
} from '../../identity/infrastructure/schemas/user.schema';

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
    const user = await this.userModel.findOne({ email: 'usuario@correo.com' });
    if (!user) {
      throw new Error('Usuario no encontrado para asociar tareas');
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
