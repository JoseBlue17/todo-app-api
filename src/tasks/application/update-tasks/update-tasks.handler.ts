import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TaskRepository } from '../../infrastructure/repositories/tasks.repositories';

import { UpdateTaskCommand } from './update-tasks.command';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler implements ICommandHandler<UpdateTaskCommand> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(command: UpdateTaskCommand) {
    const updatedTask = await this.taskRepository.updateTask({
      taskId: command.taskId,
      userId: command.userId,
      title: command.title,
      description: command.description,
      completed: command.completed,
      category: command.category,
      dueDate: command.dueDate,
    });

    if (!updatedTask) {
      throw new Error('Task not found');
    }

    return updatedTask;
  }
}
