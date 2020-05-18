import {Article} from './article.model';

export interface Tag {
  id?: string;
  description?: string;
  articleList?: Array<Article>;
}
