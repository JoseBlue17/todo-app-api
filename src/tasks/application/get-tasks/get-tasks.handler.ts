import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TaskRepository } from '../../infrastructure/repositories/tasks.repositories';

import { GetTasksQuery } from './get-tasks.query';

const PAGE_SIZE = 10;

@QueryHandler(GetTasksQuery)
export class GetTasksHandler implements IQueryHandler<GetTasksQuery> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(query: GetTasksQuery) {
    return this.taskRepository.searchTasks({
      userId: query.userId,
      terms: query.filters?.terms,
      cursor: query.filters?.cursor,
      size: query.filters?.size || PAGE_SIZE,
    });
  }
}
