import {OrderLine} from './orderLine.model';

export interface OrderDetails {
  id: string;
  description: string;
  provider: string;
  openingDate: Date;
  closingDate?: Date;
  orderLines: OrderLine[];
}
