import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {AppEndpoints} from '../../app-endpoints';
import {HttpService} from '../../core/http.service';
import {Ticket} from './ticket.model';
import {TicketSearch} from '../tickets/ticket-search.model';
import {ShoppingState} from './shopping.model';

@Injectable()
export class TicketService {

  constructor(private httpService: HttpService) {
  }

  readAll(): Observable<Ticket[]> {
    return this.httpService.get(AppEndpoints.TICKETS);
  }

  readOne(reference: string): Observable<Ticket> {
    return this.httpService.get(AppEndpoints.TICKET_TRACKING + '/' + reference);
  }

  getPdf(id: string): Observable<Ticket> {
    return this.httpService.pdf().get(AppEndpoints.TICKETS + '/' + id + '/pdf');
  }

  everyArticleIsCommitted(ticket: Ticket): boolean {
    const list = ticket.shoppingList;
    return list && list.length > 0 && list.every( value => value.shoppingState === ShoppingState.COMMITTED );
  }

  someArticleIsNotCommited(ticket: Ticket): boolean {
    const list = ticket.shoppingList;
    return list && list.length > 0 && list.some( value => value.shoppingState !== ShoppingState.COMMITTED );
  }

  filterTicketArticlesNotCommitted(ticket: Ticket) {
    return ticket.shoppingList.filter(value => value.shoppingState !== ShoppingState.COMMITTED);
  }

  getTicket(id: string): Observable<Ticket> {
    return this.httpService.get(AppEndpoints.TICKETS + '/' + id);
  }

  advancedSearch(ticketSearch: TicketSearch): Observable<Ticket[]> {
    if (ticketSearch.mobile) {
      this.httpService.param('mobile', ticketSearch.mobile);
    }
    if (ticketSearch.date) {
      this.httpService.param('date', ticketSearch.date.toISOString());
    }
    if (ticketSearch.amount) {
      this.httpService.param('amount', ticketSearch.amount.toString());
    }
    return this.httpService.get(AppEndpoints.TICKETS + '/search');
  }

  getNotCommittedTicketsByArticleId(articleId: string): Observable<Ticket[]> {
    return this.httpService.get(AppEndpoints.TICKETS + '/search/article/' + articleId);
  }

  getNotCommittedTicketsByOrderId(orderId: string): Observable<Ticket[]> {
    return this.httpService.get(AppEndpoints.TICKETS + '/search/order/' + orderId);
  }
}
