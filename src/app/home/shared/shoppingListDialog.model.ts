import {ShoppingState} from './shopping.model';

export class ShoppingListDialog {
  description: string;
  retailPrice: number;
  amount: number;
  discount: number;
  total: number;
  shoppingState: ShoppingState;

  constructor() {}

  static round(value: number) {
    return Math.round(value * 100) / 100;
  }

  updateTotal(): void {
    this.total = ShoppingListDialog.round(this.retailPrice * this.amount * (1 - this.discount / 100));
  }
}
