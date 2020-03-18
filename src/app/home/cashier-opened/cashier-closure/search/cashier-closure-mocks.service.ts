import {Injectable} from '@angular/core';
import {CashierClosureSearch} from './cashier-closure-search.model';
import {formatDate} from '@angular/common';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CashierClosureMocks {
  private fecha = formatDate(new Date(), 'yyyy/MM/dd', 'en');
  CashierClosureSearchMock: CashierClosureSearch[] = [ {
  openingDate: null,
  initialCash: 200,
  salesCard: 300,
  salesCash: 200,
  usedVouchers: 100,
  deposit: 20,
  withdrawal: 50,
  lostCard: 0,
  finalCash: 400,
  comment: null,
  closureDateS: this.fecha,
  closureDate: null
},
    {
      openingDate: null,
      initialCash: 300,
      salesCard: 100,
      salesCash: 200,
      usedVouchers: 200,
      deposit: 300,
      withdrawal: 200,
      lostCard: 0,
      finalCash: 400,
      comment: null,
      closureDateS: this.fecha,
      closureDate: null
    },
    {
      openingDate: null,
      initialCash: 300,
      salesCard: 200,
      salesCash: 300,
      usedVouchers: 300,
      deposit: 200,
      withdrawal: 200,
      lostCard: 20,
      finalCash: 500,
      comment: null,
      closureDateS: this.fecha,
      closureDate: null
    }];
  constructor() {
  }
  getAll(): Observable<CashierClosureSearch[]> {
    return of(this.CashierClosureSearchMock);
  }
}
