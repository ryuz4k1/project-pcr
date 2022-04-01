import { Component } from '@angular/core';
import { ListService } from './list.service';
import { mapTo, merge } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  public pcrList$ = this.service.pcrList$;

  public cacheId: number;
  public currPageSize = 10;

  public loading$ = this.service.pcrList$.pipe(
    mapTo(false),
    merge(this.service.requestPcrList$.pipe(mapTo(true))),
  );

  constructor(private service: ListService) {
    this.trackByLogs = this.trackByLogs.bind(this);
  }

  public trackByLogs(index, item) {
    this.cacheId = item.Id;
    return item.Id;
  }


  // tslint:disable-next-line:variable-name
  public triggerPageSize(pagination_size: number) {
    console.log('triggerPageSize');
    this.currPageSize = pagination_size;
    this.service.initFilter$.next({ ...this.service.initFilter$.value, pagination_size });
    this.service.requestPcrList$.next({ ...this.service.initFilter$.value });

  }

  // tslint:disable-next-line:variable-name
  public triggerPageIndex(current_page_number: number) {
    console.log('triggerPageIndex');
    this.service.initFilter$.next({ ...this.service.initFilter$.value, current_page_number });
    this.service.requestPcrList$.next({ ...this.service.initFilter$.value });
  }

}
