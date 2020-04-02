import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {AppEndpoints} from '../../app-endpoints';
import {HttpService} from '../../core/http.service';
import {Sendings} from './sendings.model';

@Injectable()
export class SendingsService {

  constructor(private httpService: HttpService) {
  }

  readAll(): Observable<Sendings[]> {
    return this.httpService.get(AppEndpoints.SENDINGS);
  }

  create(newSendings: Sendings): Observable<Sendings> {
    return this.httpService.post(AppEndpoints.SENDINGS, newSendings);
  }

  update(sendings: Sendings): Observable<Sendings> {
    return this.httpService.put(AppEndpoints.SENDINGS + '/' + sendings.id, sendings);
  }

  delete(sendings: Sendings): Observable<Sendings> {
    return this.httpService.delete(AppEndpoints.SENDINGS + '/' + sendings.id);
  }

}
