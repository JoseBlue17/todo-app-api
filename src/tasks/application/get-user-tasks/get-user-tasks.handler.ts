import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { TaskRepository } from '../../infrastructure/repositories/tasks.repositories';

import { GetUserTasksQuery } from './get-user-tasks.query';

@QueryHandler(GetUserTasksQuery)
export class GetUserTasksHandler implements IQueryHandler<GetUserTasksQuery> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(query: GetUserTasksQuery) {
    const pageSize = 10;

    const result = await this.taskRepository.searchTasks({
      userId: query.userId,
      terms: query.filters?.terms,
      cursor: query.filters?.cursor,
      size: query.filters?.size || pageSize,
    });

    const filteredTasks = result.tasks.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed,
      category: task.category,
      dueDate: task.dueDate,
    }));

    return {
      tasks: filteredTasks,
      cursor: result.cursor,
    };
  }
}
