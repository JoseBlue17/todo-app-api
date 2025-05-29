import { Task } from '../task.model';

export abstract class ITaskRepository {
  abstract findByUserId(userId: string): Promise<Task[]>;
} 