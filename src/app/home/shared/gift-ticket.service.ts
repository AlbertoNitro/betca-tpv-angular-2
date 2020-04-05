import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {AppEndpoints} from '../../app-endpoints';
import {HttpService} from '../../core/http.service';
import {GiftTicket} from './gift-ticket.model';
import {GiftTicketCreation} from '../cashier-opened/shopping-cart/gift-ticket-creation.model';


@Injectable()
export class GiftTicketService {

  constructor(private httpService: HttpService) {
  }

  createAndPrint(giftTicketCreation: GiftTicketCreation): Observable<GiftTicket> {
    return this.httpService.pdf().post(AppEndpoints.GIFT_TICKETS, giftTicketCreation);
  }
}
