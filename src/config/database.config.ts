import { registerAs } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { ensureEnvVar } from './env-variable.utils';

type DatabaseConfig = {
  mongo: MongooseModuleOptions;
};

export default registerAs(
  'database',
  (): DatabaseConfig => ({
    mongo: {
      uri: ensureEnvVar(process.env.MONGODB_URI),
      autoCreate: true,
      autoIndex: true,
    },
  }),
);
