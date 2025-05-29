import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ITaskRepository } from '../../domain/repositories/task.repository.interface';
import { Task } from '../../domain/task.model';

import { GetUserTasksQuery } from './get-user-tasks.query';

@QueryHandler(GetUserTasksQuery)
export class GetUserTasksHandler implements IQueryHandler<GetUserTasksQuery> {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(query: GetUserTasksQuery): Promise<Task[]> {
    return this.taskRepository.findByUserId(query.userId);
  }
}
