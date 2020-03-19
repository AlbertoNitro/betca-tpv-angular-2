import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../../../core/http.service';
import {CashierState} from '../cashier-state.model';
import {AppEndpoints} from '../../../../app-endpoints';
import {CashierMovements} from './cash-movements.model';

@Injectable()
export class CashMovementsService {

  constructor(private httpService: HttpService) {
  }

  readState(): Observable<CashierState> {
    return this.httpService.get(AppEndpoints.CASHIER_CLOSURES_LAST_STATE);
  }

  deposit(cashierMovements: CashierMovements): Observable<void> {
    return this.httpService.patch(AppEndpoints.CASH_MOVEMENT_DEPOSIT, cashierMovements);
  }

}
