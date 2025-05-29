import { seeder } from 'nestjs-seeder';
import { NestFactory } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppModule } from 'src/app.module';
import { UserSeeder } from '../seed/user.seeder';

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
    ],
  }).run([UserSeeder]);
}

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error'],
  });
  runInitialSeeders();
  return app.close();
}

main();
