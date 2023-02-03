import { Pipe, PipeTransform } from '@angular/core';
import { PaginationService, PagingInfo } from '../services/paginator.service';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {
  
  constructor(private paginationService: PaginationService) { }

  transform(value: Array<any>, pageInfo: PagingInfo): any {
    return this.paginationService.paginate(value, pageInfo);
  }

}
