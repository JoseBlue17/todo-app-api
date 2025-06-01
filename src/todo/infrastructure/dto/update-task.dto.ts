import {
  IsString,
  IsOptional,
  IsBoolean,
  IsHexColor,
  IsDate,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsString()
  @IsHexColor()
  category?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dueDate?: Date;
}
