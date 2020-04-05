import {ShoppingState} from '../../shared/shopping.model';

export class Shopping {
  amount: number;
  discount: number;
  total: number;
  committed: boolean;
  shoppingState: ShoppingState;

  constructor(public code: string, public description: string, public retailPrice: number, shoppingState?: ShoppingState) {
    this.amount = 1;
    this.discount = 0;
    this.total = this.retailPrice * this.amount * (1 - this.discount / 100);
    this.committed = true;
    this.shoppingState = shoppingState;
  }

  static round(value: number) {
    return Math.round(value * 100) / 100;
  }

  setDiscount(value: number) {
    this.discount = value;
  }

  setTotal(value: number) {
    this.total = value;
  }

  setAmount(value: number) {
    this.amount = value;
  }

  setCommited(value: boolean) {
    this.committed = value;
  }

  updateTotal(): void {
    this.total = Shopping.round(this.retailPrice * this.amount * (1 - this.discount / 100));
  }

  updateDiscount(): void {
    this.discount = Shopping.round(100 * (1 - (this.total / (this.amount * this.retailPrice))));
  }

  toString(): string {
    return 'code:' + this.code + ', delivered:' + this.committed;
  }
}
