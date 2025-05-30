import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ITaskRepository } from '../../domain/repositories/task.repository.interface';
import { CreateTaskCommand } from './create-task.command';
import { Task } from '../../domain/task.model';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    @Inject(ITaskRepository)
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute(command: CreateTaskCommand): Promise<Task> {
    const defaultCategoryColor = '#FF0000';

    let dueDate: Date | null = null;
    if (command.dueDate) {
      const [day, month, year] = command.dueDate.split('/').map(Number);
      dueDate = new Date(year, month - 1, day);
      if (isNaN(dueDate.getTime())) {
        dueDate = null;
      }
    } else {
      dueDate = null;
    }

    const newTask = new Task({
      id: undefined,
      title: command.title,
      description:
        command.description === undefined ? null : command.description,
      completed: command.completed,
      category: command.category || defaultCategoryColor,
      dueDate: dueDate,
      userId: command.userId,
    });
    return this.taskRepository.createTask(newTask);
  }
}
