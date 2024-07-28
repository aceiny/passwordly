
import { ConnectionOptions } from 'tls';

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} environment variable is required.`);
  }
  return value;
}

export const PostgresConfig = {
  type: 'postgres',
  host: getEnvVar('POSTGRES_HOST') || 'localhost',
  port: 5432,
  username: getEnvVar('POSTGRES_USERNAME'),
  password: getEnvVar('POSTGRES_PASSWORD'),
  database: process.env.POSTGRES_DB || 'postgres',
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  synchronize: true, // set to false in production
  extra: { // apply pg pooling 
    max: 20, // maximum number of clients in the pool
    idleTimeoutMillis: 30000, // close idle clients after 30 seconds
    connectionTimeoutMillis: 2000, // return an error after 2 seconds if connection could not be made
  },
} as ConnectionOptions;

export const RedisConfig = {
  host: getEnvVar("REDIS_HOST"), 
  port:  +getEnvVar('REDIS_PORT'), 
  /*username: getEnvVar("REDIS_USERNAME"),
  password: getEnvVar("REDIS_PASSWORD"),
  tls: {
    servername: getEnvVar("REDIS_SERVER_NAME"),
  },*/ // local development
}