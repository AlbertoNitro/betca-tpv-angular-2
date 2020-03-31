import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {OrderDetails} from './orderDetails.model';
import {OrderService} from './order.service';
import {OrderLineDetail} from './OrderLineDetail.model';
import {OrderCreationDialogComponent} from './order-creation-dialog.component';

@Component({
  templateUrl: 'order-detail-dialog.component.html'
})

export class OrderDetailDialogComponent {

  order: OrderDetails = {id: null, description: null, provider: null, openingDate: null, closingDate: null, orderLines: []};
  provider: string;

  title = 'Orders\' articles';
  columns = ['articleId', 'requiredAmount', 'finalAmount'];
  data: OrderLineDetail[];

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<OrderDetailDialogComponent>, private message: MatSnackBar,
              private orderService: OrderService, @Inject(MAT_DIALOG_DATA) public orderData: any) {
    this.orderService.get(orderData.orderId).subscribe(
      data => {
        this.order = data;
        this.data = this.order.orderLines;
        this.provider = orderData.provider;
      }
    );
  }

  create() {
    this.dialogRef.close();
    this.dialog.open(OrderCreationDialogComponent, {
      width: '600px',
      data: {
        providerId: this.order.provider
      }
    });
  }
}
