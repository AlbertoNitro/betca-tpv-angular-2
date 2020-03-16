import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../../../core/http.service';
import {CashierState} from '../cashier-state.model';
import {AppEndpoints} from '../../../../app-endpoints';

@Injectable()
export class CashMovementsService {

  constructor(private httpService: HttpService) {
  }

  readState(): Observable<CashierState> {
    return this.httpService.get(AppEndpoints.CASHIER_CLOSURES_LAST_STATE);
  }

}
