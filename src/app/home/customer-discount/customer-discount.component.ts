import {Component} from '@angular/core';
import {CustomerDiscount} from './customer-discount.model';
import {CustomerDiscountService} from './customer-discount.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {CustomerDiscountCreationDialogComponent} from './customer-discount-creation-dialog-component';

@Component({
  templateUrl: 'customer-discount.component.html',
  providers: [CustomerDiscountService]
})

export class CustomerDiscountComponent {
  title: 'Customer Discount';
  columns: ['Mobile', 'Discount'];
  data: CustomerDiscount[];
  isEdit: boolean;

  constructor(private customerDiscountService: CustomerDiscountService, private snackBar: MatSnackBar,
              private dialog: MatDialog) {
    this.customerDiscountService.readAll().subscribe(
      data => this.data = data
    );
  }

  create() {
    this.isEdit = false;
    this.dialog.open(CustomerDiscountCreationDialogComponent,
      {
        width: '500px',
        data: {
          isEdit: this.isEdit
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

  delete($event: CustomerDiscount) {
    this.customerDiscountService.delete($event).subscribe(
      () => this.snackBar.open('Delete ok', null, {duration: 2000})
    );
  }

  read($event: CustomerDiscount) {
    this.snackBar.open('Minimum purchase is ' + $event.minimumPurchase);
  }

  update($event: CustomerDiscount) {
    this.customerDiscountService.update($event.id, $event).subscribe(
      () => this.snackBar.open('Update ok', null, {duration: 2000})
    );
  }
}

