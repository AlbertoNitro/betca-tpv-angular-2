import {Component} from '@angular/core';
import {CashierClosureSearch} from './cashier-closure-search.model';
import {CashierClosureMocks} from './cashier-closure-mocks.service';
import {CashierService} from '../../../shared/cashier.service';

@Component({
  templateUrl: 'cashier-closure-search.component.html'

})
export class CashierClosureSearchComponent {
  modelCashierClosureSearch: CashierClosureSearch;
  title = 'Cashier Closure List';
  // tslint:disable-next-line:max-line-length
  columns = ['closureDate', 'initialCash', 'salesCard', 'salesCash', 'usedVouchers', 'deposit', 'withdrawal', 'lostCard', 'lostCash', 'finalCash'];
  data: CashierClosureSearch[];

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
  }
  search() {
    if (this.modelCashierClosureSearch.closureDate == null && this.modelCashierClosureSearch.finalCash == null) {
    this.cashierService.readAll().subscribe(
      data => this.data = data
    );
    } else {
      let closureDate: string;
      let finalCash: number;
      closureDate = '';
      finalCash = -1;
      if (this.modelCashierClosureSearch.closureDate != null) {
        closureDate = this.modelCashierClosureSearch.closureDate.toISOString();
      }
      if (this.modelCashierClosureSearch.finalCash != null) {
        finalCash = this.modelCashierClosureSearch.finalCash;
      }
      this.cashierService.search(finalCash, closureDate).subscribe(data => this.data = data);
    }
  }
   // search() {
    // this.cashierClosureMocks.getAll().subscribe(
     // data => {this.data = [...data];
     // }
     // );
  // }
}
