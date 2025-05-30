import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetUserTasksQuery } from './get-user-tasks.query';
import { TaskRepository } from '../../infrastructure/repositories/tasks.repositories';

@QueryHandler(GetUserTasksQuery)
export class GetUserTasksHandler implements IQueryHandler<GetUserTasksQuery> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(query: GetUserTasksQuery) {
    return this.taskRepository.findByUserId(query.userId);
  }
}
