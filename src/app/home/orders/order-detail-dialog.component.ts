import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {OrderDetails} from './orderDetails.model';
import {OrderService} from './order.service';
import {OrderLineDetail} from './OrderLineDetail.model';

@Component({
  templateUrl: 'order-detail-dialog.component.html'
})

export class OrderDetailDialogComponent {

  order: OrderDetails = {id: null, description: null, provider: null, openingDate: null, closingDate: null, orderLines: []};

  title = 'Orders\' articles';
  columns = ['article', 'requiredAmount', 'finalAmount'];
  data: OrderLineDetail[];

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<OrderDetailDialogComponent>, private message: MatSnackBar,
              private orderService: OrderService, @Inject(MAT_DIALOG_DATA) public orderData: any) {
    this.order = orderData.orderData;
    this.data = [...this.orderData.orderData.orderLines];
  }
}
