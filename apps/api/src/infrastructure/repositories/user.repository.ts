import { User } from '../../domain/user.entity';
import { PostgresDataSource } from '../database/postgres';

export const userRepository = PostgresDataSource.getRepository(User);
