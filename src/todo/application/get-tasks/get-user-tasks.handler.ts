import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { formatDateToDDMMYYYY } from '../../../shared/utils/date.utils';

import { TaskRepository } from '../../infrastructure/repositories/tasks.repositories';

import { GetUserTasksQuery } from './get-user-tasks.query';

@QueryHandler(GetUserTasksQuery)
export class GetUserTasksHandler implements IQueryHandler<GetUserTasksQuery> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(query: GetUserTasksQuery) {
    const result = await this.taskRepository.findByUserId(query.userId);

    const formatDueDate = (task: any) => {
      if (!task) return task;

      const formattedTask: any = {
        _id: task._id,
        title: task.title,
        description: task.description,
        completed: task.completed,
        category: task.category,
        userId: task.userId,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      };

      if (task.dueDate instanceof Date) {
        formattedTask.dueDate = formatDateToDDMMYYYY(task.dueDate);
      } else {
        formattedTask.dueDate = task.dueDate;
      }

      return formattedTask;
    };

    if (Array.isArray(result)) {
      return result.map(formatDueDate);
    }

    return formatDueDate(result);
  }
}
