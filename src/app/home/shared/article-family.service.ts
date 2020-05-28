import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {AppEndpoints} from '../../app-endpoints';
import {HttpService} from '../../core/http.service';
import {ArticlesFamily, ArticlesFamilyCreation} from './articles-family.model';

@Injectable()
export class ArticlesFamilyService {

  constructor(private httpService: HttpService) {
  }

  searchById(id: string): Observable<ArticlesFamily> {
    return this.httpService.get(AppEndpoints.ARTICLES_FAMILY + '/' + id);
  }

  readAll(): Observable<ArticlesFamily[]> {
    return this.httpService.get(AppEndpoints.ARTICLES_FAMILY);
  }

  search(reference: string): Observable<ArticlesFamily[]> {
    this.httpService.param('reference', reference);
    return this.httpService.get(AppEndpoints.ARTICLES_FAMILY);
  }

  delete(id: string){
    return this.httpService.delete(AppEndpoints.ARTICLES_FAMILY + '/' + id);
  }

  create(articlesFamily: ArticlesFamilyCreation): Observable<ArticlesFamily> {
    return this.httpService.successful().post(AppEndpoints.ARTICLES_FAMILY + AppEndpoints.CREATE_ARTICLES_FAMILY, articlesFamily);
  }

  update(id: string, articlesFamily: ArticlesFamilyCreation): Observable<ArticlesFamily> {
    return this.httpService.put(AppEndpoints.ARTICLES_FAMILY + '/' + id, articlesFamily);
  }

/*
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
*/
}
