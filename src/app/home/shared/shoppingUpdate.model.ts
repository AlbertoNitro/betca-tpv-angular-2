import {ShoppingState} from './shopping.model';

export interface ShoppingUpdate {
  articleId: string;
  amount: number;
  shoppinState: ShoppingState;
}
