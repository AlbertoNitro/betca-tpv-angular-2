import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {Observable} from 'rxjs';
import {AppEndpoints} from '../../app-endpoints';
import {QuarterVatModel} from './quarter-vat.model';
import {Quarter} from './quarter.enum';

@Injectable()
export class VatManagementService {

  constructor(private httpService: HttpService) {
  }

  read(quarter: Quarter): Observable<QuarterVatModel> {
    return this.httpService.get(`${AppEndpoints.VAT_MANAGEMENT}/${quarter}`);
  }
}
