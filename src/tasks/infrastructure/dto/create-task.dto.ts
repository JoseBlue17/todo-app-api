import {
  IsString,
  IsOptional,
  IsBoolean,
  IsHexColor,
  IsDate,
  IsNotEmpty,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ALLOWED_COLORS } from 'src/shared/utils/common-colors';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsHexColor()
  @IsIn(ALLOWED_COLORS, {
    message: `Category color must be one of the allowed values: ${ALLOWED_COLORS.join(
      ', ',
    )}`,
  })
  category?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dueDate?: Date;
}
