import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TaskIndexerService } from '../../infrastructure/services/task-indexer.service';

import { GetTasksQuery } from './get-tasks.query';

const PAGE_SIZE = 10;

@QueryHandler(GetTasksQuery)
export class GetTasksHandler implements IQueryHandler<GetTasksQuery> {
  constructor(private readonly taskIndexerService: TaskIndexerService) {}

  async execute(query: GetTasksQuery) {
    return this.taskIndexerService.searchTasks({
      userId: query.userId,
      terms: query.filters?.terms,
      cursor: query.filters?.cursor,
      size: query.filters?.size || PAGE_SIZE,
    });
  }
}
