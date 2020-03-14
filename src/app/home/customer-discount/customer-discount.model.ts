export interface CustomerDiscount {
  id: string;
  description?: string;
  registrationDate?: Date;
  discount: number;
  minimumPurchase?: number;
}
