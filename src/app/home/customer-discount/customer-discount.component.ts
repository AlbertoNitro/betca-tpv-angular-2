import {Component} from '@angular/core';
import {CustomerDiscount} from './customer-discount.model';
import {CustomerDiscountService} from './customer-discount.service';

@Component({
  templateUrl: 'customer-discount.component.html',
  providers: [CustomerDiscountService]
})

export class CustomerDiscountComponent {
  title: 'Customer Discount';
  columns: ['Mobile', 'Discount'];
  data: CustomerDiscount[];

  create() {
  }

  delete($event: any) {
  }

  read($event: any) {
  }

  update($event: any) {
  }
}

