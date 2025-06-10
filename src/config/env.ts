import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  app: {
    PORT: get('PORT').default('3000').asPortNumber(),
    NODE_ENV: get('NODE_ENV').default('development').asEnum(['development', 'production', 'test']),
  },
  db: {
    USERNAME: get('DATABASE_USERNAME').required().asString(),
    PASSWORD: get('DATABASE_PASSWORD').required().asString(),
    HOST: get('DATABASE_HOST').required().asString(),
    PORT: get('DATABASE_PORT').required().asPortNumber(),
    NAME: get('DATABASE_NAME').required().asString(),
  },
  jwt: {
    KEY: get('JWT_KEY').required().asString(),
    EXPIRE_IN: get('JWT_EXPIRE_IN').default('3h').asString(),
  },
};
