import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ALLOWED_COLORS } from 'src/shared/utils/common-colors';

import { TaskRepository } from '../../infrastructure/repositories/tasks.repositories';

import { CreateTaskCommand } from './create-task.command';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(command: CreateTaskCommand) {
    const taskData = {
      ...command,
      completed: command.completed ?? false,
      category: command.category ?? ALLOWED_COLORS[0],
    };

    const createdTask = await this.taskRepository.createTask(taskData);
    return createdTask;
  }
}
