import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {AppEndpoints} from '../../../app-endpoints';
import {Size} from './size.model';
import {HttpService} from '../../../core/http.service';
import {SizeType} from './size-type.model';

@Injectable()
export class SizeService {
  constructor(private httpService: HttpService) {
  }
  public findById(id: string): Observable<Size[]> {
    return this.httpService.get(AppEndpoints.ARTICLES_FAMILY + AppEndpoints.SIZES + '/' + id);
  }
  public readAll(): Observable<SizeType[]> {
    return this.httpService.get(AppEndpoints.ARTICLES_FAMILY + AppEndpoints.SIZES_TYPE);
  //  return of([{id: 1, name: 'International'}, {id: 2, name: 'Number'}]);
  }
}
