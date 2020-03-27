import {Shopping} from '../shopping.model';

export interface NegativeInvoice {
  returnedTicketId: string;
  returnedShoppingList: Shopping[];
}
