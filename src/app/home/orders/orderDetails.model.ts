import {OrderLineDetail} from './OrderLineDetail.model';

export interface OrderDetails {
  id: string;
  description: string;
  provider: string;
  openingDate: Date;
  closingDate?: Date;
  orderLines: OrderLineDetail[];
}
