import {Injectable} from '@angular/core';
import {HttpService} from '../../../core/http.service';
import {Article} from '../../shared/article.model';
import {Observable} from 'rxjs';
import {AppEndpoints} from '../../../app-endpoints';
import {TicketSearch} from '../../tickets/ticket-search.model';
import {Ticket} from '../../shared/ticket.model';
import {ArticleSearch} from './article-advanced-search.model';


@Injectable()
export class AdvancedArticlesSearchService {
  data: Article[];

  constructor(private httpService: HttpService) {
  }

  readAll(): Observable<Article[]> {
    return this.httpService.get(AppEndpoints.ARTICLES);
    /*this.data = [
      {code: '21', description: 'Falda T2', reference: 'Fa T2', stock: 24, retailPrice: 10},
      {code: '22', description: 'Pantalon vaquero', reference: 'Pant Vaq', stock: 10, retailPrice: 23}
    ];
    return this.data;*/
  }

  advancedArticleSearch(articleSearch: ArticleSearch): Observable<Article[]> {
    if (articleSearch.description) {
      this.httpService.param('description', articleSearch.description);
    }
    if (articleSearch.reference) {
      this.httpService.param('reference', articleSearch.reference);
    }
    if (articleSearch.stock) {
      this.httpService.param('stock', articleSearch.stock.toLocaleString());
    }
    if (articleSearch.provider) {
      this.httpService.param('provider', articleSearch.provider);
    }
    if (articleSearch.retailPrice) {
      this.httpService.param('retailPrice', articleSearch.retailPrice.toLocaleString());
    }
    if (articleSearch.discontinued) {
      this.httpService.param('discontinued', String(articleSearch.discontinued));
    }
    return this.httpService.get(AppEndpoints.ARTICLES + '/advancedSearch');
  }
}
