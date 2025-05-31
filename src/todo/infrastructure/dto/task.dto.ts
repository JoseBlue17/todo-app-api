import {
  IsString,
  IsOptional,
  IsBoolean,
  IsHexColor,
  IsDate,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsBoolean()
  completed: boolean;

  @IsOptional()
  @IsString()
  @IsHexColor()
  category?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dueDate?: Date;
}
