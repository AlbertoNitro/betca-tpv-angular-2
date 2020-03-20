import {Component, Inject} from '@angular/core';
import {OrderService} from './order.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {OrderDetails} from './orderDetails.model';

@Component({
  templateUrl: 'order-close-dialog.component.html'
})

export class OrderCloseDialogComponent {

  order: OrderDetails = {id: null, description: null, provider: null, openingDate: null, closingDate: null, orderLines: []};

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<OrderCloseDialogComponent>, private message: MatSnackBar,
              private orderService: OrderService, @Inject(MAT_DIALOG_DATA) public orderData: any) {

    this.orderService.get(orderData.orderId).subscribe(
      data => {
        this.order = data;
      }
    );
  }

  close() {
    this.orderService.close(this.order).subscribe(
      data => {
        this.message.open('Order closed: ' + data.description, null, {
          duration: 2000,
        });
        this.dialogRef.close();
      }
    );
  }
}
