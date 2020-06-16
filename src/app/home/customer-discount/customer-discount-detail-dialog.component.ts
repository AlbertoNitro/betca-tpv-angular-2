import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {CustomerDiscount} from './customer-discount.model';
import {CustomerDiscountService} from './customer-discount.service';

@Component({
  styleUrls: ['customer-discount-detail-dialog.component.css'],
  templateUrl: `customer-discount-detail-dialog.component.html`
})
export class CustomerDiscountDetailDialogComponent {

  customerDiscount: CustomerDiscount = {
    id: null,
    discount: null,
    mobile: null,
    registrationDate: null,
    description: null,
    minimumPurchase: null
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private customerDiscountService: CustomerDiscountService) {
    this.customerDiscount = data.obj;
  }
}
