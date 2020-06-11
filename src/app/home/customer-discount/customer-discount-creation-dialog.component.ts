import {Component, Inject} from '@angular/core';
import {CustomerDiscount} from './customer-discount.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {CustomerDiscountService} from './customer-discount.service';

@Component({
  styleUrls: ['customer-discount-creation-dialog.component.css'],
  templateUrl: `customer-discount-creation-dialog.component.html`
})

export class CustomerDiscountCreationDialogComponent {
  newCustomerDiscount: CustomerDiscount = {
    id: null,
    description: null,
    discount: null,
    minimumPurchase: null,
    mobile: null
  };
  update: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<CustomerDiscountCreationDialogComponent>,
              private snackBar: MatSnackBar,
              private customerDiscountService: CustomerDiscountService) {
    this.update = data.update;
    if (data.update) {
      this.customerDiscountService.readOne(data.mobile).subscribe(
        customerDiscount => {
          this.newCustomerDiscount = customerDiscount;
        }
      );
    }
  }

  create() {
    this.customerDiscountService.create(this.newCustomerDiscount).subscribe(
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

  updateCustomerDiscount() {
    this.customerDiscountService.update(this.newCustomerDiscount.mobile, this.newCustomerDiscount).subscribe(
      (data) => {
        this.newCustomerDiscount = data;
        this.dialog.closeAll();
      }
       , () => this.snackBar.open('Ups, something bad happened.', null, {
        duration: 2000,
      })
      , () => this.snackBar.open('Customer discount updated successfully', null, {
        duration: 2000,
      })
    );
  }
}
