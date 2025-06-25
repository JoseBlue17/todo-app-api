import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TaskRepository } from '../../infrastructure/repositories/tasks.repositories';

import { GetTasksQuery } from './get-tasks.query';

const PAGE_SIZE = 10;

const ESSENTIAL_TASK_FIELDS = {
  title: true,
  description: true,
  completed: true,
  category: true,
  dueDate: true,
};

@QueryHandler(GetTasksQuery)
export class GetTasksHandler implements IQueryHandler<GetTasksQuery> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(query: GetTasksQuery) {
    const result = await this.taskRepository.searchTasks(
      {
        ...query,
        size: query.filters?.size || PAGE_SIZE,
      },
      ESSENTIAL_TASK_FIELDS,
    );
    return result;
  }
}
