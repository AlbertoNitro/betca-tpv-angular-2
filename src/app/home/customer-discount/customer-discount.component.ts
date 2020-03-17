import {Component} from '@angular/core';
import {CustomerDiscount} from './customer-discount.model';

@Component({
  templateUrl: 'customer-discount.component.html'
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

