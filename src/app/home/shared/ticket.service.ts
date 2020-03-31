import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {AppEndpoints} from '../../app-endpoints';
import {HttpService} from '../../core/http.service';
import {Ticket} from './ticket.model';

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
    return this.httpService.pdf().get(AppEndpoints.TICKETS + '/' + id);
  }

  everyArticleIsCommitted(ticket: Ticket): boolean {
    const list = ticket.shoppingList;
    return list && list.length > 0 && list.every( value => value.shoppingState.toString() === 'COMMITTED' );
  }

  someArticleIsNotCommited(ticket: Ticket): boolean {
    const list = ticket.shoppingList;
    return list && list.length > 0 && list.some( value => value.shoppingState.toString() !== 'COMMITTED' );
  }
}
