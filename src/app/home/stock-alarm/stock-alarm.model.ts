export interface StockAlarm {
  id: string;
  description: string;
  provider?: string;
  warning?: number;
  critical?: number;
  stockAlarmArticle: StockAlarmArticle[];
}

export interface StockAlarmArticle {
  articleId: string;
  warning: number;
  critical: number;
}

export interface StockAlarmArticleSearch {
  code: string;
  description: string;
  stock: number;
  warning: number;
  critical: number;
}

export interface StockAlarmCreate {
  description: string;
  provider?: string;
  warning?: number;
  critical?: number;
  stockAlarmArticle: StockAlarmArticle[];
}
