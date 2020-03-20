import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {OrderLineCreation} from './orderLineCreation.model';
import {OrderService} from './order.service';
import {OrderCreation} from './orderCreation.model';
import {Provider} from '../shared/provider.model';
import {Article} from '../shared/article.model';
import {ArticleService} from '../shared/article.service';
import {OrderLineDetail} from './OrderLineDetail.model';

@Component({
  templateUrl: 'order-creation-dialog.component.html'
})

export class OrderCreationDialogComponent {

  order: OrderCreation = {description: null, providerId: null, orderLines: []};
  orderLine: OrderLineCreation = {articleId: null, requiredAmount: null};

  @Input() articleIn = '';
  @Output() articleOut = new EventEmitter<any>();
  articles: Article[];

  title = 'Orders\' articles';
  columns = ['articleId', 'requiredAmount'];
  data: OrderLineCreation[];

  constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<OrderCreationDialogComponent>, private message: MatSnackBar,
              private orderService: OrderService, private articleService: ArticleService) {
  }

  createOrder() {
    this.orderService.createOrder(this.order).subscribe(
      data => {
        this.message.open('Order created: ' + data.description, null, {
          duration: 2000,
        });
        this.dialogRef.close();
      });
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
