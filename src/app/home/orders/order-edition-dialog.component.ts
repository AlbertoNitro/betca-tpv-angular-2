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
    this.orderService.get(orderData.orderId).subscribe(
      data => {
        this.order = data;
        this.data = [...data.orderLines];
      }
    );
  }

  editOrder() {
    this.orderService.update(this.order).subscribe(
      value => {
        this.message.open('Order deleted: ' + this.order.description, null, {
          duration: 2000,
        });
        this.dialogRef.close();
      }
    );
  }

  deleteOrderLine(orderLineToDelete: OrderLineDetail) {
    const index = this.order.orderLines.findIndex(value => value.article === orderLineToDelete.article);
    if (index > -1) {
      this.order.orderLines.splice(index, 1);
    }
    this.data = [...this.order.orderLines];
  }

  closeOrder() {
    // TODO
  }
}
