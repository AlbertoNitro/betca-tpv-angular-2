import {Article} from './article.model';

export interface Offer {
  id?: string;
  description?: string;
  registrationDate?: Date;
  expirationDate?: Date | string;
  articleList?: Array<Article>;
  discount?: number;
}
