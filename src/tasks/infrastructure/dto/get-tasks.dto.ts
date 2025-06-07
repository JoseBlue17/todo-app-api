import { IsString, IsOptional } from 'class-validator';
import { IsObjectId } from 'src/shared/validation';

export class GetTasksDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsObjectId()
  cursor?: string;
}
