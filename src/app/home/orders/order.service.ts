import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {Observable, of} from 'rxjs';
import {OrderDetails} from './orderDetails.model';
import {OrderLine} from './orderLine.model';
import {OrderCreation} from './orderCreation.model';
import {OrderSearch} from './orderSearch.model';
import {AppEndpoints} from '../../app-endpoints';

@Injectable()
export class OrderService {

  ordersMockList: OrderDetails[];
  orderLinesMockList: OrderLine[];

  constructor(private httpService: HttpService) {
    this.orderLinesMockList = [
      {articleId: '15651', requiredAmount: 5, finalAmount: null},
      {articleId: '984651', requiredAmount: 5, finalAmount: null},
      {articleId: '5641981', requiredAmount: 5, finalAmount: null},
    ];
    this.ordersMockList = [
      {
        id: '0',
        provider: '1154',
        description: 'Order 1',
        openingDate: new Date(),
        closingDate: null,
        orderLines: this.orderLinesMockList
      },
      {
        id: '1',
        provider: '4421',
        description: 'Order 2',
        openingDate: new Date(),
        closingDate: null,
        orderLines: this.orderLinesMockList
      },
      {
        id: '2',
        provider: '5431',
        description: 'Order 3',
        openingDate: new Date(),
        closingDate: null,
        orderLines: this.orderLinesMockList
      },
    ];
  }

  getAll(): Observable<OrderDetails[]> {
    return of(this.ordersMockList);
  }

  createOrder(newOrder: OrderCreation): Observable<OrderDetails> {
    const order: OrderDetails = {
      id: this.ordersMockList.length.toString(),
      provider: newOrder.provider,
      description: newOrder.description,
      openingDate: new Date(),
      closingDate: null,
      orderLines: newOrder.orderLines
    };
    this.ordersMockList.push(order);
    return of(order);
  }

  search(orderSearch: OrderSearch): Observable<OrderDetails[]> {
    let orderClosingDate = null;
    if (orderSearch.closingDate != null) {
      orderClosingDate = orderSearch.closingDate.toISOString();
    }
    return this.httpService
      .param('description', orderSearch.description)
      .param('provider', orderSearch.provider)
      .param('closingDate', orderClosingDate)
      .get(AppEndpoints.ORDERS);
  }
}
