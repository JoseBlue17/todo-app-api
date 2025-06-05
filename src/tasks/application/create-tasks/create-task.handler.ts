import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TaskRepository } from '../../infrastructure/repositories/tasks.repositories';

import { CreateTaskCommand } from './create-task.command';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(command: CreateTaskCommand) {
    const defaultCategoryColor = '#FF0000';
    
    const taskData = {
      title: command.title,
      description: command.description ?? null,
      completed: command.completed ?? false,
      category: command.category ?? defaultCategoryColor,
      dueDate: command.dueDate ?? null,
      userId: command.userId,
    };

    return this.taskRepository.createTask(taskData);
  }
}
