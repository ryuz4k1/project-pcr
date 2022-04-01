import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { startWith, debounceTime, switchMap, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PcrList, ServerPcrList } from './models';


export interface PcrFilter {
  pagination_size?: number;
  current_page_number?: number;
}

export const DEFAULT_PCR_REQUEST_FILTERS: PcrFilter = {
  pagination_size: 10,
  current_page_number: 1,
};

@Injectable({
  providedIn: 'root'
})
export class ListService {

  public static PATH = `${environment.api}/pcr`;

  public initFilter$ = new BehaviorSubject<PcrFilter>(DEFAULT_PCR_REQUEST_FILTERS);

  // Shipment List
  public requestPcrList$ = new Subject<PcrFilter>();
  public pcrList$: Observable<PcrList> = this.requestPcrList$.pipe(
    startWith({ ...this.initFilter$.value }),
    debounceTime(300),
    switchMap((filters) => this.getPcrList(filters)),
    shareReplay({ refCount: false, bufferSize: 1 })
  );


  constructor(private http: HttpClient) { }

  // Shipment List
  public async getPcrList(filters: PcrFilter): Promise<PcrList> {
    const payload = {
      pagination_size: filters.pagination_size + '',
      current_page_number: filters.current_page_number + ''
    };
    const result = await this.http.get<ServerPcrList>(`${ListService.PATH}`, { params: {...payload} }).toPromise();
    return PcrList.fromServerData(result);
  }
}
