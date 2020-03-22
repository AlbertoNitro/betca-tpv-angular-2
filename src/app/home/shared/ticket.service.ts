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
    return this.httpService.get(AppEndpoints.TICKETS + '/' + reference);
  }
}
