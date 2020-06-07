import {Component, OnInit} from '@angular/core';
import {CustomerDiscount} from './customer-discount.model';
import {CustomerDiscountService} from './customer-discount.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {CustomerDiscountCreationDialogComponent} from './customer-discount-creation-dialog-component';

@Component({
  templateUrl: `customer-discount.component.html`,
  providers: [CustomerDiscountService]
})

export class CustomerDiscountComponent implements OnInit {

  title = 'Customer Discount';
  data: CustomerDiscount[];
  columns: string[] = ['mobile', 'discount', 'actions'];

  constructor(private customerDiscountService: CustomerDiscountService, private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.customerDiscountService.readAll().subscribe(
      data => this.data = data
    );
  }

  create() {
    this.dialog.open(CustomerDiscountCreationDialogComponent, {
        data: {
          update: false
        }
      }
    ).afterClosed().subscribe(
      result => {
        this.customerDiscountService.readAll().subscribe(
          data => this.data = data
        );
      }
    );
  }

  delete(customerDiscount: CustomerDiscount) {
    this.customerDiscountService.delete(customerDiscount).subscribe(
      () => this.snackBar.open('Delete ok', null, {duration: 2000})
    );
  }

  read(customerDiscount: CustomerDiscount) {
    this.snackBar.open('Minimum purchase is ' + customerDiscount.minimumPurchase);
  }

  update(customerDiscount: CustomerDiscount) {
    this.customerDiscountService.update(customerDiscount.id, customerDiscount).subscribe(
      () => this.snackBar.open('Update ok', null, {duration: 2000})
    );
  }

}
