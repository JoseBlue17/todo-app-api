import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TaskRepository } from '../../infrastructure/repositories/tasks.repositories';

import { GetUserTasksQuery } from './get-user-tasks.query';

@QueryHandler(GetUserTasksQuery)
export class GetUserTasksHandler implements IQueryHandler<GetUserTasksQuery> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(query: GetUserTasksQuery) {
    const pageSize = 10;
    const selectFields = query.select || {
      title: true,
      description: true,
      completed: true,
      category: true,
      dueDate: true,
    };

    const result = await this.taskRepository.searchTasks(
      {
        userId: query.userId,
        terms: query.filters?.terms,
        cursor: query.filters?.cursor,
        size: query.filters?.size || pageSize,
      },
      selectFields,
    );

    return result;
  }
}
