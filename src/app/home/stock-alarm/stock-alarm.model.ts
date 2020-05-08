import {Article} from '../shared/article.model';

export interface StockAlarm {
  id: string;
  description: string;
  provider?: string;
  warning?: number;
  critical?: number;
  stockAlarmArticle: StockAlarmArticle[];
}

export interface StockAlarmArticle {
  article: Article;
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
