import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../core/http.service';
import {AppEndpoints} from '../../app-endpoints';
import {Article} from '../shared/article.model';
import {StockManagementSearchModel} from './StockManagementSearch.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private httpService: HttpService) {
  }

  getAll(stockManagementSearch: StockManagementSearchModel): Observable<Article[]> {
    const initDate = stockManagementSearch.initDate != null ? stockManagementSearch.initDate.toISOString() : '';
    const endDate = stockManagementSearch.endDate != null ? stockManagementSearch.endDate.toISOString() : '';
    const minimumStock = stockManagementSearch.minimumStock != null ? stockManagementSearch.minimumStock : '';

    return this.httpService
        .param('initDate', initDate)
        .param('endDate', endDate)
        .param('minimumStock', minimumStock)
        .get(AppEndpoints.STOCK);

  }

}
