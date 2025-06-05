import { IsOptional } from 'class-validator';

export class FilterSearchTasksDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  description?: string;
}
