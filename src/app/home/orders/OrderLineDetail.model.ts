export interface OrderLineDetail {
  articleId: string;
  requiredAmount: number;
  finalAmount?: number;
}
