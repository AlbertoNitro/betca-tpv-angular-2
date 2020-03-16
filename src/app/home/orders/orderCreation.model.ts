import {OrderLine} from './orderLine.model';

export interface OrderCreation {
  description: string;
  provider: string;
  orderLines: OrderLine[];
}
