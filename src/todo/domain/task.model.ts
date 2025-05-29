import { TaskDocument } from "../infrastructure/schemas/task.schema";

type ExtendedTaskDocument = TaskDocument & {
  createdAt?: Date;
  updatedAt?: Date;
};

export class Task {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly completed: boolean;
  readonly category?: string;
  readonly dueDate?: Date;
  readonly userId: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(params: {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    category?: string;
    dueDate?: Date;
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
    return new Task({
      id: String(document._id),
      title: document.title,
      description: document.description,
      completed: document.completed,
      category: document.category,
      dueDate: document.dueDate,
      userId: String(document.userId),
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }

  // markAsCompleted() { this.completed = true; } revisión futura
} 