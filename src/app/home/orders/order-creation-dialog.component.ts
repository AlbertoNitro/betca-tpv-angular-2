import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {OrderLineCreation} from './orderLineCreation.model';
import {OrderService} from './order.service';
import {OrderCreation} from './orderCreation.model';
import {Provider} from '../shared/provider.model';
import {Article} from '../shared/article.model';
import {ArticleService} from '../shared/article.service';

@Component({
  templateUrl: 'order-creation-dialog.component.html'
})

export class OrderCreationDialogComponent {

  order: OrderCreation = {description: null, providerId: null, orderLines: []};
  orderLine: OrderLineCreation = {articleId: null, requiredAmount: null};
  isProviderNull: boolean;

  @Input() articleIn = '';
  @Output() articleOut = new EventEmitter<any>();
  articles: Article[];

  title = 'Orders\' articles';
  columns = ['articleId', 'requiredAmount'];
  data: OrderLineCreation[];

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<OrderCreationDialogComponent>, private message: MatSnackBar,
              private orderService: OrderService, private articleService: ArticleService, @Inject(MAT_DIALOG_DATA) public orderData: any) {
    this.order.providerId = orderData.providerId;
    this.isProviderNull = true;
    if (orderData.providerId !== null) {
      this.isProviderNull = false;
      this.articleService.readAll().subscribe(
        data => this.articles = data.filter(value => value.provider === this.order.providerId)
      );
    }
    console.log(this.order);
  }

  createOrder() {
    if (this.isNotValid()) {
      return;
    }
    this.orderService.createOrder(this.order).subscribe(
      data => {
        this.message.open('Order created: ' + data.description, null, {
          duration: 2000,
        });
        this.dialogRef.close();
      });
  }

  isNotValid(): boolean {
    return this.empty(this.order.description) || this.empty(this.order.providerId) || this.order.orderLines === [];
  }

  empty(field: string): boolean {
    return field == null ||
      field === '';
  }

  getProvider(provider: Provider) {
    this.order.providerId = provider.id;
    this.articleService.readAll().subscribe(
      data => this.articles = data.filter(value => value.provider === this.order.providerId)
    );
  }

  onSelect(article) {
    this.orderLine.articleId = article.code;
  }

  addOrderLine() {
    this.order.orderLines.push({articleId: this.orderLine.articleId, requiredAmount: this.orderLine.requiredAmount});
    this.data = [...this.order.orderLines];
  }

  deleteOrderLine(orderLineDelete: OrderLineCreation) {
    const index = this.order.orderLines.findIndex(value => value.articleId === orderLineDelete.articleId);
    if (index > -1) {
      this.order.orderLines.splice(index, 1);
    }
    this.data = [...this.order.orderLines];
  }

}
