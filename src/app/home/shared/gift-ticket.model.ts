import {Ticket} from './ticket.model';

export class GiftTicket {
  id: string;
  expirationDate: number;
  personalizedMessage: string;
  ticket: Ticket;
}
