export interface Shopping {
  code: string;
  description: string;
  retailPrice: number;
  amount: number;
  discount?: number;
  shoppingState?: ShoppingState;
}

export enum ShoppingState {
  NOT_COMMITED,
  REQUIRE_PROVIDER,
  IN_STOCK,
  COMMITTED
}
