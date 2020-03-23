import {Shopping} from './shopping.model';

export interface Ticket {
  id ?: string;
  reference: string;
  shoppingList?: Array<Shopping>;
}
