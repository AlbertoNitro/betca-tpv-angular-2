import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {AppEndpoints} from '../../app-endpoints';
import {CustomerDiscount} from './customer-discount.model';
import {Observable} from 'rxjs';

@Injectable()
export class CustomerDiscountService {

  constructor(private httpService: HttpService) {
  }

  readOne(mobile: string): Observable<CustomerDiscount> {
    return this.httpService.get(AppEndpoints.CUSTOMER_DISCOUNTS + '/' + mobile);
  }

  create(customerDiscount: CustomerDiscount): Observable<CustomerDiscount> {
    return this.httpService.post(AppEndpoints.CUSTOMER_DISCOUNTS, customerDiscount);
  }

  readAll(): Observable<CustomerDiscount[]> {
    return this.httpService.get(AppEndpoints.CUSTOMER_DISCOUNTS);
  }

  update(id: string, customerDiscount: CustomerDiscount): Observable<CustomerDiscount> {
    return this.httpService.put(AppEndpoints.CUSTOMER_DISCOUNTS + '/' + customerDiscount.id, customerDiscount);
  }

  delete(customerDiscount: CustomerDiscount): Observable<void> {
    return this.httpService.delete(AppEndpoints.CUSTOMER_DISCOUNTS + '/' + customerDiscount.id);
  }

}
