import {Component} from '@angular/core';
import {CashierClosureSearch} from './cashier-closure-search.model';
import {CashierClosureMocks} from './cashier-closure-mocks.service';
import {CashierService} from '../../../shared/cashier.service';

@Component({
  templateUrl: 'cashier-closure-search.component.html'

})
export class CashierClosureSearchComponent {
  modelCashierClosureSearch: CashierClosureSearch;
  title = 'Cashier Closure Search';
  // tslint:disable-next-line:max-line-length
  columns = ['closureDate', 'initialCash', 'salesCard', 'salesCash', 'usedVouchers', 'deposit', 'withdrawal', 'lostCard', 'lostCash', 'finalCash'];
  data: CashierClosureSearch[];
  minDate: Date;

  constructor(private cashierService: CashierService) {
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
      lostCash: null,
      finalCash: null,
      comment: null
    };
    this.data = null;
    this.minDate = new Date(2020, 1, 1);
  }
  search() {
    if (this.modelCashierClosureSearch.closureDate == null && this.modelCashierClosureSearch.finalCash == null) {
    this.cashierService.readAll().subscribe(
      data => this.data = data
    );
    }
  }
   // search() {
    // this.cashierClosureMocks.getAll().subscribe(
     // data => {this.data = [...data];
     // }
     // );
  // }
}
