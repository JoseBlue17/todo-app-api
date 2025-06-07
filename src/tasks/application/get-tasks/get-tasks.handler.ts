import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TaskRepository } from '../../infrastructure/repositories/tasks.repositories';

import { GetTasksQuery } from './get-tasks.query';

@QueryHandler(GetTasksQuery)
export class GetTasksHandler implements IQueryHandler<GetTasksQuery> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(query: GetTasksQuery) {
    return this.taskRepository.getTasks(query.userId, query.filters);
  }
}
