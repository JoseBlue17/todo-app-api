import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TaskRepository } from '../../infrastructure/repositories/tasks.repositories';

import { GetTasksQuery } from './get-tasks.query';

@QueryHandler(GetTasksQuery)
export class GetTasksHandler implements IQueryHandler<GetTasksQuery> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(query: GetTasksQuery) {
    const tasks = await this.taskRepository.getTasks(
      query.userId,
      query.filters,
    );

    const cursor =
      tasks.length > 0 ? tasks[tasks.length - 1]._id.toString() : undefined;

    return { data: tasks, cursor };
  }
}
