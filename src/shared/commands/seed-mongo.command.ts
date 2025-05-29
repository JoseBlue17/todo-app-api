import { seeder } from 'nestjs-seeder';
import { NestFactory } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppModule } from 'src/app.module';

import { TaskSeeder } from '../seed/task.seeder';
import { UserSeeder } from '../seed/user.seeder';

import { Task, TaskSchema } from 'src/todo/infrastructure/schemas/task.schema';
import {
  User,
  UserSchema,
} from 'src/identity/infrastructure/schemas/user.schema';

function runInitialSeeders() {
  seeder({
    imports: [
      AppModule,
      ConfigModule,
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    ],
  }).run([UserSeeder, TaskSeeder]);
}

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error'],
  });
  runInitialSeeders();
  return app.close();
}

main();
