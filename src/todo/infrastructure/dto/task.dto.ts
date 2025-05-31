import {
  IsString,
  IsOptional,
  IsBoolean,
  IsHexColor,
  Matches,
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
  @IsHexColor()
  category?: string;

  @IsOptional()
  @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'El formato de fecha debe ser DD/MM/YYYY',
  })
  dueDate?: string;
}
