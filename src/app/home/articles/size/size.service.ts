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
  public readAllInternational(): Observable<Size[]> {
    return this.httpService.get(AppEndpoints.SIZES_INTERNATIONAL);
  }
  public readAllNumber(): Observable<Size[]> {
    return this.httpService.get(AppEndpoints.SIZES_NUMBER);
  }
  public readAll(): Observable<SizeType[]> {
    return of([{id: 1, name: 'International'}, {id: 2, name: 'Number'}]);
  }
}
