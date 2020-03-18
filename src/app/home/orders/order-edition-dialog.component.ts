import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {OrderDetails} from './orderDetails.model';
import {OrderService} from './order.service';
import {OrderLineDetail} from './OrderLineDetail.model';

@Component({
  templateUrl: 'order-edition-dialog.component.html'
})

export class OrderEditionDialogComponent {

  order: OrderDetails = {id: null, description: null, provider: null, openingDate: null, closingDate: null, orderLines: []};

  title = 'Orders\' articles';
  columns = ['article', 'requiredAmount', 'finalAmount'];
  data: OrderLineDetail[];

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<OrderEditionDialogComponent>, private message: MatSnackBar,
              private orderService: OrderService, @Inject(MAT_DIALOG_DATA) public orderData: any) {
    this.order = orderData.orderData;
    this.data = [...this.orderData.orderData.orderLines];
  }

  editOrder() {
    this.dialogRef.close();
  }

  deleteOrderLine(orderLineToDelete: OrderLineDetail) {
    // TODO
  }

  closeOrder() {
    // TODO
  }
}
