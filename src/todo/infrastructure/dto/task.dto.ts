import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsBoolean()
  completed: boolean;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  category?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: Date;
}
