import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsBoolean()
  completed: boolean;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: Date;
}
