import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {Observable, of} from 'rxjs';
import {OrderDetails} from './orderDetails.model';
import {OrderCreation} from './orderCreation.model';
import {OrderSearch} from './orderSearch.model';
import {AppEndpoints} from '../../app-endpoints';

@Injectable()
export class OrderService {

  constructor(private httpService: HttpService) {
  }

  createOrder(newOrder: OrderCreation): Observable<OrderDetails> {
    return this.httpService.post(AppEndpoints.ORDERS, newOrder);
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

  delete(order: OrderDetails): Observable<void> {
    return this.httpService.delete(AppEndpoints.ORDERS + '/' + order.id);
  }

  update(order: OrderDetails): Observable<OrderDetails> {
    return this.httpService.put(AppEndpoints.ORDERS + '/' + order.id, order);
  }

  get(orderId: string): Observable<OrderDetails> {
    return this.httpService.get(AppEndpoints.ORDERS + '/' + orderId);
  }
}
