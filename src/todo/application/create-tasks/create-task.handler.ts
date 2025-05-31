import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TaskRepository } from '../../infrastructure/repositories/tasks.repositories';

import { CreateTaskCommand } from './create-task.command';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(command: CreateTaskCommand): Promise<any> {
    const defaultCategoryColor = '#FF0000';
    const dueDate: Date | null | undefined = command.dueDate;
    const description: string | null | undefined = command.description;

    const taskData = {
      title: command.title,
      description: description,
      completed: false,
      category: command.category || defaultCategoryColor,
      dueDate: dueDate,
      userId: command.userId,
    };

    return this.taskRepository.createTask(taskData);
  }
}
