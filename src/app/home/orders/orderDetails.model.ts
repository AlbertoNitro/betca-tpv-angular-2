import {OrderLine} from './orderLine.model';

export interface OrderDetails {
  id: string;
  description: string;
  providerId: string;
  openingDate: Date;
  closingDate?: Date;
  orderLines: OrderLine[];
}
