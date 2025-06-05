import { FilterSearchTasksDto } from '../../infrastructure/dto/filter-search-tasks.dto';

export class SearchTasksQuery {
  constructor(
    readonly filters: FilterSearchTasksDto,
    readonly userId: string,
  ) {}
}
