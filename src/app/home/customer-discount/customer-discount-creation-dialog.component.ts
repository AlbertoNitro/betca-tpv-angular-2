import {Component, Inject} from '@angular/core';
import {CustomerDiscount} from './customer-discount.model';
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar} from '@angular/material';
import {CustomerDiscountService} from './customer-discount.service';

@Component({
  styleUrls: ['customer-discount-creation-dialog.component.css'],
  templateUrl: `customer-discount-creation-dialog.component.html`
})

export class CustomerDiscountCreationDialogComponent {
  flag: boolean;
  id: string;
  customerDiscount: CustomerDiscount = {
    id: null,
    description: null,
    discount: null,
    minimumPurchase: null,
    mobile: null
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private customerDiscountService: CustomerDiscountService) {
    this.flag = data.flag;
    if (this.flag) {
      this.id = data.id;
      this.customerDiscount = data.obj;
    }
  }

  createDiscount() {
    this.customerDiscountService.create(this.customerDiscount).subscribe(
      () => {
        this.dialog.closeAll();
      }
      , () => this.snackBar.open('Ups, something bad happened.', null, {
        duration: 2000,
      })
      , () => this.snackBar.open('Customer discount created successfully', null, {
        duration: 2000,
      })
    );
  }

  updateDiscount() {
    this.customerDiscountService.update(this.id, this.customerDiscount).subscribe(
      () => this.dialog.closeAll()
      , () => this.snackBar.open('Ups, something bad happened.', null, {
        duration: 2000,
      })
      , () => this.snackBar.open('Customer discount updated successfully', null, {
        duration: 2000,
      })
    );
  }
}
