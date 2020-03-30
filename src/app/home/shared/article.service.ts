import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {AppEndpoints} from '../../app-endpoints';
import {HttpService} from '../../core/http.service';
import {Article} from './article.model';
import {ArticleFamily} from '../articles/articles-family-dialog.model';

@Injectable()
export class ArticleService {

  constructor(private httpService: HttpService) {
  }

  readOne(code: string): Observable<Article> {
    return this.httpService.get(AppEndpoints.ARTICLES + '/' + code);
  }

  readAll(): Observable<Article[]> {
    return this.httpService.get(AppEndpoints.ARTICLES);
  }

  create(article: Article): Observable<Article> {
    return this.httpService.successful().post(AppEndpoints.ARTICLES, article);
  }

  update(code: string, article: Article): Observable<Article> {
    return this.httpService.put(AppEndpoints.ARTICLES + '/' + code, article);
  }

  search(description: string, provider: string): Observable<Article[]> {
    this.httpService.param('description', description);
    this.httpService.param('provider', provider);
    return this.httpService.get(AppEndpoints.ARTICLES + '/' + 'search');
  }

  createFamily(articleFamily: ArticleFamily): Observable<ArticleFamily> {
    return this.httpService.post(AppEndpoints.ARTICLES_FAMILY, articleFamily);
  }
  readSizes(): Observable<[]> {
    return this.httpService.get(AppEndpoints.ARTICLES_FAMILY + AppEndpoints.SIZES);
  }

}
