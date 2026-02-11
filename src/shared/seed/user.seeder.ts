import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import {
  User,
  UserDocument,
} from '../../identity/infrastructure/schemas/user.schema';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async drop() {
    await this.userModel.deleteMany({});
  }

  async seed() {
    const email = 'usuario@correo.com';
    const password = await bcrypt.hash('Usuario123', 10);

    const exists = await this.userModel.findOne({ email });
    if (!exists) {
      await this.userModel.create({
        email,
        password,
        profile: {
          firstName: 'Usuario',
          lastName: 'Normal',
          avatarUrl:
            'https://th.bing.com/th/id/OIP.gqgy3AdO3w1OxLcHsuJ9XgHaHU?rs=1&pid=ImgDetMain',
        },
        language: 'es',
        phone: '1234567890',
      });
    }
  }
}
