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
  columns = ['closureDate', 'initialCash', 'salesCard', 'salesCash', 'usedVouchers', 'deposit', 'withdrawal', 'lostCard', 'lostCash', 'finalCash', 'comment'];
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
  resetSearch() {
    this.modelCashierClosureSearch = {
      closureDate: null,
      closureDateS: null,
      openingDate: null,
      initialCash: null,
      salesCash: null,
      salesCard: null,
      usedVouchers: null,
      deposit: null,
      withdrawal: null,
      lostCash: null,
      lostCard: null,
      finalCash: null,
      comment: null
    };
  }
  search() {
    if (this.modelCashierClosureSearch.closureDate == null &&
      this.modelCashierClosureSearch.closureDateS == null &&
      this.modelCashierClosureSearch.finalCash == null) {
      this.cashierService.readAll().subscribe(
        data => this.data = data
      );
    } else {
      let closureDate: string;
      let closureDateF: string;
      let finalCash: number;
      let validation: boolean;
      closureDateF = '';
      closureDate = '';
      finalCash = -1;
      validation = true;
      if (this.modelCashierClosureSearch.closureDate != null) {
        if (this.modelCashierClosureSearch.closureDateS == null) {
          alert('You must enter date until');
          validation = false;
        }
        closureDate = this.modelCashierClosureSearch.closureDate.toISOString();
      }
      if (this.modelCashierClosureSearch.closureDateS != null) {
        if (this.modelCashierClosureSearch.closureDate != null) {
          alert('you must enter date from');
          validation = false;
        }
        closureDateF = this.modelCashierClosureSearch.closureDateS.toISOString();
      }
      if (this.modelCashierClosureSearch.closureDate != null &&
        this.modelCashierClosureSearch.closureDateS != null) {
        if (this.modelCashierClosureSearch.closureDate > this.modelCashierClosureSearch.closureDateS) {
          alert('Date from must be less than or equal to date until');
          validation = false;
        }
      }
      if (this.modelCashierClosureSearch.finalCash != null) {
        finalCash = this.modelCashierClosureSearch.finalCash;
      }
      if (validation) {
        this.cashierService.search(finalCash, closureDate, closureDateF).subscribe(data => this.data = data);
      }
    }
  }
   // search() {
    // this.cashierClosureMocks.getAll().subscribe(
     // data => {this.data = [...data];
     // }
     // );
  // }
}
