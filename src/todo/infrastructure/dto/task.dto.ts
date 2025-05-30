import {
  IsString,
  IsOptional,
  IsBoolean,
  IsHexColor,
  Matches,
} from 'class-validator';

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
  @IsHexColor()
  category?: string;

  @IsOptional()
  @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'El formato de fecha debe ser DD/MM/YYYY',
  })
  dueDate?: string;
}
