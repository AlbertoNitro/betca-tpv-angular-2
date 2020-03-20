import {Component} from '@angular/core';
import {OrderDetails} from './orderDetails.model';
import {MatDialog, MatSnackBar} from '@angular/material';
import {OrderCreationDialogComponent} from './order-creation-dialog.component';
import {OrderService} from './order.service';
import {OrderDetailDialogComponent} from './order-detail-dialog.component';
import {OrderEditionDialogComponent} from './order-edition-dialog.component';
import {CancelYesDialogComponent} from '../../core/cancel-yes-dialog.component';
import {OrderSearch} from './orderSearch.model';
import {Provider} from '../shared/provider.model';

@Component({
  templateUrl: `orders.component.html`
})

export class OrdersComponent {

  order: OrderDetails;
  orderSearch: OrderSearch;
  pendingOrders: boolean;

  title = 'Orders management';
  columns = ['description', 'provider', 'openingDate'];
  data: OrderDetails[];

  constructor(private dialog: MatDialog, private orderService: OrderService, private message: MatSnackBar) {
    this.order = {id: null, description: null, provider: null, orderLines: null, openingDate: null};
    this.orderSearch = {description: null, provider: null, closingDate: new Date()};
    this.data = null;
    this.pendingOrders = true;
  }

  search() {
    if (this.pendingOrders === true) {
      this.orderSearch.closingDate = null;
    } else {
      this.orderSearch.closingDate = new Date();
    }
    this.orderService.search(this.orderSearch).subscribe(
      data => {
        this.data = [...data];
      }
    );
  }

  resetSearch() {
    this.orderSearch = {description: null, provider: null};
  }

  getProvider(provider: Provider) {
    this.orderSearch.provider = provider.id;
  }

  create() {
    this.dialog.open(OrderCreationDialogComponent, {
      width: '600px',
      data: {
        providerId: null
      }
    });
  }

  read(order: OrderDetails) {
    this.dialog.open(OrderDetailDialogComponent, {
      width: '600px',
      data: {
        dialogTitle: order.description,
        orderData: order
      }
    });
  }

  update(order: OrderDetails) {
    this.dialog.open(OrderEditionDialogComponent, {
      width: '600px',
      data: {
        orderId: order.id
      }
    });
  }

  delete(orderToDelete: OrderDetails) {
    this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
      result => {
        if (result) {
          this.orderService.delete(orderToDelete).subscribe(
            value => {
              this.message.open('Order deleted: ' + orderToDelete.description, null, {
                duration: 2000,
              });
            }
          );
        }
      }
    );
  }

}
