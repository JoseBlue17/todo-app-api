import { IsOptional, IsNumber, Min } from 'class-validator';

export class FilterSearchTasksDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  offset?: number;
}
