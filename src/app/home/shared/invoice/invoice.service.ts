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
    if (filter.mobile) {
      this.httpService.param('mobile', filter.mobile);
    }
    if (filter.fromDate) {
      this.httpService.param('fromDate', filter.fromDate);
    }
    if (filter.toDate) {
      this.httpService.param('toDate', filter.toDate ? filter.toDate : null);
    }
    return this.httpService.get(AppEndpoints.INVOICES + AppEndpoints.SEARCH);
  }

  print(id: string): Observable<any> {
    return this.httpService.pdf().get(AppEndpoints.INVOICES + '/' + id);
  }
}




