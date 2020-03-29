import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {OrderDetails} from './orderDetails.model';
import {OrderService} from './order.service';
import {OrderLineDetail} from './OrderLineDetail.model';
import {OrderCreationDialogComponent} from './order-creation-dialog.component';
import {ProviderService} from '../shared/provider.service';
import {Provider} from '../shared/provider.model';

@Component({
  templateUrl: 'order-detail-dialog.component.html'
})

export class OrderDetailDialogComponent {

  order: OrderDetails = {id: null, description: null, provider: null, openingDate: null, closingDate: null, orderLines: []};
  provider: Provider;

  title = 'Orders\' articles';
  columns = ['article', 'requiredAmount', 'finalAmount'];
  data: OrderLineDetail[];

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<OrderDetailDialogComponent>, private message: MatSnackBar,
              private orderService: OrderService, @Inject(MAT_DIALOG_DATA) public orderData: any,
              private providerService: ProviderService) {
    this.orderService.get(orderData.orderId).subscribe(
      data => {
        this.order = data;
        this.data = this.order.orderLines;
        this.providerService.readAll().subscribe(
          dataProvider => this.provider = dataProvider.filter(value => value.id === this.order.provider)[0]
        );
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
