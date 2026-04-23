import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TaskRepository } from '../../infrastructure/repositories/tasks.repositories';

import { DeleteTaskCommand } from './delete-task.command';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler implements ICommandHandler<DeleteTaskCommand> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(command: DeleteTaskCommand) {
    await this.taskRepository.deleteTask(command.taskId, command.userId);
    return { success: true };
  }
}
