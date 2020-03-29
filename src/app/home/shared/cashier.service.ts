import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {AppEndpoints} from '../../app-endpoints';
import {HttpService} from '../../core/http.service';
import {CashierLast} from './cashier-last.model';
import {CashierClosureSearch} from '../cashier-opened/cashier-closure/search/cashier-closure-search.model';


@Injectable()
export class CashierService {

  constructor(private httpService: HttpService) {
  }

  readLast(): Observable<CashierLast> {
    return this.httpService.get(AppEndpoints.CASHIER_CLOSURES_LAST);
  }

  readAll(): Observable<CashierClosureSearch[]> {
    return this.httpService.get(AppEndpoints.CASHIER_CLOSURE_SEARCH);
  }

  search(finalCash: number, closureDate: string, closureDateF: string): Observable<CashierClosureSearch[]> {
    this.httpService.param('finalCash', finalCash.toString());
    this.httpService.param('closureDate', closureDate);
    this.httpService.param('closureDateF', closureDateF);
    return this.httpService.get(AppEndpoints.CASHIER_CLOSURE_SEARCH_BY_PARAMS);
  }
}
