import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  connectTimeoutMS: 10000,
  maxQueryExecutionTime: 5000,
  entities: ['dist/**/*.entity.{ts,js}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  migrationsRun: true,
});
