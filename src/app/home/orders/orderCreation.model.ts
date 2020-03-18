import {OrderLineCreation} from './orderLineCreation.model';

export interface OrderCreation {
  description: string;
  providerId: string;
  orderLines: OrderLineCreation[];
}
