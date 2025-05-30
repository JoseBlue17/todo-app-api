import { TaskDocument } from '../infrastructure/schemas/task.schema';

type ExtendedTaskDocument = TaskDocument & {
  createdAt?: Date;
  updatedAt?: Date;
};

export class Task {
  readonly id: string;
  readonly title: string;
  readonly description?: string | null;
  readonly completed: boolean;
  readonly category?: string | null;
  readonly dueDate?: Date | string | null;
  readonly userId: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(params: {
    id: string;
    title: string;
    description?: string | null;
    completed: boolean;
    category?: string | null;
    dueDate?: Date | string | null;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = params.id;
    this.title = params.title;
    this.description = params.description;
    this.completed = params.completed;
    this.category = params.category;
    this.dueDate = params.dueDate;
    this.userId = params.userId;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }

  static fromDocument(document: ExtendedTaskDocument): Task {
    const formatDate = (date?: Date | null): string | null => {
      if (!date) return null;
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    return new Task({
      id: String(document._id),
      title: document.title,
      description: document.description,
      completed: document.completed,
      category: document.category,
      dueDate: formatDate(document.dueDate),
      userId: String(document.userId),
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }
}
