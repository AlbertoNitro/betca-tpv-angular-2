import {Component} from '@angular/core';
import {CashierClosureSearch} from './cashier-closure-search.model';
import {CashierClosureMocks} from './cashier-closure-mocks.service';

@Component({
  templateUrl: 'cashier-closure-search.component.html'

})
export class CashierClosureSearchComponent {
  modelCashierClosureSearch: CashierClosureSearch;
  title = 'Cashier Closure Search';
  // tslint:disable-next-line:max-line-length
  columns = ['closureDateS', 'initialCash', 'salesCard', 'salesCash', 'usedVouchers', 'deposit', 'withdrawal', 'lostCard', 'finalCash'];
  data: CashierClosureSearch[];

  constructor(private cashierClosureMocks: CashierClosureMocks) {
    this.modelCashierClosureSearch = {
      // tslint:disable-next-line:max-line-length
      closureDate: null,
      closureDateS: null,
      openingDate: null,
      initialCash: null,
      salesCard: null,
      salesCash: null,
      usedVouchers: null,
      deposit: null,
      withdrawal: null,
      lostCard: null,
      finalCash: null,
      comment: null
    };
  }
  search() {
    this.cashierClosureMocks.getAll().subscribe(
      data => {this.data = [...data];
      }
      );
  }
}
