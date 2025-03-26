import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../../domain/user.entity';
import { InitialMigration1711456789123 } from './migrations/1711456789123-InitialMigration';
import { Task } from '../../domain/task.entity';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'postgres',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'challenge_db',
  synchronize: false, // Desactivado para usar migraciones
  entities: [User, Task],
  migrations: [InitialMigration1711456789123],
  migrationsRun: true, // Ejecuta las migraciones automáticamente al iniciar
  logging: true, // Añadimos logging para ver qué está pasando
});
