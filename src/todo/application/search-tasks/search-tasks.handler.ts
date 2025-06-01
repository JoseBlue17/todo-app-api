import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TaskRepository } from '../../infrastructure/repositories/tasks.repositories';

import { SearchTasksQuery } from './search-tasks.query';

@QueryHandler(SearchTasksQuery)
export class SearchTasksHandler implements IQueryHandler<SearchTasksQuery> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(query: SearchTasksQuery) {
    return this.taskRepository.searchTasks(query.filters, query.userId);
  }
}
