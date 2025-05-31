import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { formatDateToDDMMYYYY } from '../../../shared/utils/date.utils';

import { TaskRepository } from '../../infrastructure/repositories/tasks.repositories';

import { CreateTaskCommand } from './create-task.command';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(command: CreateTaskCommand): Promise<any> {
    const defaultCategoryColor = '#FF0000';

    let dueDate: Date | null = null;
    if (command.dueDate) {
      const [day, month, year] = command.dueDate.split('/').map(Number);
      dueDate = new Date(year, month - 1, day);
      if (isNaN(dueDate.getTime())) {
        dueDate = null;
      }
    }

    const taskData = {
      title: command.title,
      description:
        command.description === undefined ? null : command.description,
      completed: command.completed,
      category: command.category || defaultCategoryColor,
      dueDate: dueDate,
      userId: command.userId,
    };

    const createdTaskDocument = await this.taskRepository.createTask(taskData);

    const createdTask = createdTaskDocument
      ? createdTaskDocument.toObject()
      : null;

    if (createdTask && createdTask.dueDate instanceof Date) {
      createdTask.dueDate = formatDateToDDMMYYYY(createdTask.dueDate);
    }

    return createdTask;
  }
}
