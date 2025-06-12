import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ALLOWED_COLORS } from 'src/shared/utils/common-colors';

import { TaskRepository } from '../../infrastructure/repositories/tasks.repositories';

import { CreateTaskCommand } from './create-task.command';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(command: CreateTaskCommand) {
    const taskData = {
      title: command.title,
      description: command.description,
      completed: command.completed ?? false,
      category: command.category ?? ALLOWED_COLORS[0],
      dueDate: command.dueDate,
      userId: command.userId,
    };

    const createdTask = await this.taskRepository.createTask(taskData);
    return createdTask;
  }
}
