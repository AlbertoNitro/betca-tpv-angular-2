import {Injectable} from '@angular/core';
import {HttpService} from '../../../core/http.service';
import {Observable} from 'rxjs';
import {AppEndpoints} from '../../../app-endpoints';
import {Invoice} from './invoice.model';
import {InvoiceFilter} from './invoice-filters.model';
import {NegativeInvoice} from './negative-invoice.model';

@Injectable()
export class InvoiceService {

  constructor(private httpService: HttpService) {
  }

  create(): Observable<any> {
    return this.httpService.pdf().post(AppEndpoints.INVOICES);
  }

  createNegative(negativeInvoice: NegativeInvoice): Observable<any> {
    return this.httpService.pdf().post(AppEndpoints.INVOICES + AppEndpoints.NEGATIVE, negativeInvoice);
  }

  readAll(): Observable<Invoice[]> {
    return this.httpService.get(AppEndpoints.INVOICES);
  }

  search(filter: InvoiceFilter): Observable<Invoice[]> {
    return this.httpService
      .param('mobile', filter.mobile ? filter.mobile : null)
      .param('fromDate', filter.fromDate ? filter.fromDate  : null)
      .param('toDate', filter.toDate ? filter.toDate : null)
      .get(AppEndpoints.INVOICES + '/search');
  }

  print(id: string): Observable<any> {
    return this.httpService.pdf().patch(AppEndpoints.INVOICES + '/' + id + AppEndpoints.PRINT);
  }
}




