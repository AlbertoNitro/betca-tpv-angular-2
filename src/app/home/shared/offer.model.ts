import {Article} from './article.model';

export interface Offer {
  id?: string;
  description?: string;
  registrationDate?: Date;
  expirationDate?: Date;
  articleList?: Array<Article>;
  discount?: number;
}
