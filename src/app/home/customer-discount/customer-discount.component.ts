import {Component, OnInit} from '@angular/core';
import {CustomerDiscount} from './customer-discount.model';
import {CustomerDiscountService} from './customer-discount.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {CustomerDiscountCreationDialogComponent} from './customer-discount-creation-dialog.component';
import {CancelYesDialogComponent} from '../../core/cancel-yes-dialog.component';
import {CustomerDiscountDetailDialogComponent} from './customer-discount-detail-dialog.component';


@Component({
  templateUrl: `customer-discount.component.html`,
  providers: [CustomerDiscountService]
})

export class CustomerDiscountComponent implements OnInit {

  customerDiscount: CustomerDiscount;
  title = 'Customer Discount';
  data: CustomerDiscount[];
  columns: string[] = ['mobile', 'discount', 'actions'];
  id: string;
  flag: string;

  constructor(private customerDiscountService: CustomerDiscountService, private snackBar: MatSnackBar,
              private dialog: MatDialog) {
    this.customerDiscount = {
      id: null, discount: null, minimumPurchase: null,
      mobile: null, registrationDate: null, description: null
    };
    this.data = null;
  }


  ngOnInit() {
    this.customerDiscountService.readAll().subscribe(
      data => {
        this.data = data;
      }
    );
  }

  read(customerDiscount: CustomerDiscount) {
    this.dialog.open(CustomerDiscountDetailDialogComponent, {
      data: {
        obj: customerDiscount,

      }
    });
  }

  create() {
    this.dialog.open(CustomerDiscountCreationDialogComponent, {
        data: {
          flag: false
        }
      }
    ).afterClosed().subscribe(
      result => {
        this.customerDiscountService.readAll().subscribe(
          data => this.data = data
        );
      });
  }

  update(customerDiscount: CustomerDiscount) {
    this.dialog.open(CustomerDiscountCreationDialogComponent, {
      data: {
        flag: true,
        id: customerDiscount.id,
        obj: customerDiscount
      }
    }).afterClosed().subscribe(
      result => {
        this.customerDiscountService.readAll().subscribe(
          data => this.data = data
        );
      });
  }

  delete(customerDiscount: CustomerDiscount) {
    this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
      result => {
        if (result) {
          this.customerDiscountService.delete(customerDiscount).subscribe(
            () => this.customerDiscountService.readAll().subscribe(
              data => this.data = data
            )
            , () => this.snackBar.open('Something bad happened', null, {
              duration: 2000,
            })
          );
        }
      }
    );
  }
}

