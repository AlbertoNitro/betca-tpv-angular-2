import {Article} from '../../shared/article.model';

export interface Tag {
  id?: string;
  description?: string;
  articles?: Article[];
}
