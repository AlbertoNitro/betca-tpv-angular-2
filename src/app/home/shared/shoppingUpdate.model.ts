import {ShoppingState} from './shopping.model';

export interface ShoppingUpdate {
  articleId: string;
  amount: number;
  shoppingState: ShoppingState;
  committed?: boolean;
}
