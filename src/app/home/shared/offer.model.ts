import {Article} from './article.model';

export interface Offer {
  id: string;
  description: string;
  registrationDate: Date;
  expiryDate: Date;
  articleList: Array<Article>;
  discount: number;
}
