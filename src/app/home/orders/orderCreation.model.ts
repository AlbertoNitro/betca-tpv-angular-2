import {OrderLine} from './orderLine.model';

export interface OrderCreation {
  description: string;
  providerId: string;
  orderLines: OrderLine[];
}
