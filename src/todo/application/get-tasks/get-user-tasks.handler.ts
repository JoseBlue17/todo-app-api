import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TaskRepository } from '../../infrastructure/repositories/tasks.repositories';
import { GetUserTasksQuery } from './get-user-tasks.query';

@QueryHandler(GetUserTasksQuery)
export class GetUserTasksHandler implements IQueryHandler<GetUserTasksQuery> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(query: GetUserTasksQuery) {
    return this.taskRepository.findByUserId(query.userId);
  }
}
