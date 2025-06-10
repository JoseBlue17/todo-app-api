import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';

import { IsObjectId } from 'src/shared/validation';

export class GetTasksDto {
  @IsOptional()
  @IsString()
  terms?: string;

  @IsOptional()
  @IsObjectId()
  cursor?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  size?: number;
}
