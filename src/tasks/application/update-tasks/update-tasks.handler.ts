import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TaskRepository } from '../../infrastructure/repositories/tasks.repositories';

import { UpdateTaskCommand } from './update-tasks.command';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler implements ICommandHandler<UpdateTaskCommand> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(command: UpdateTaskCommand) {
    const updatedTask = await this.taskRepository.updateTask({
      ...command,
    });

    return updatedTask;
  }
}
