import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../core/http.service';
import {AppEndpoints} from '../../app-endpoints';
import {Article} from '../shared/article.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private httpService: HttpService) {
  }

  getAll(): Observable<Article[]> {
    return this.httpService.get(AppEndpoints.STOCK);
  }

}
