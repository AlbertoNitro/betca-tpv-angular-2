import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {AppEndpoints} from '../../app-endpoints';
import {CustomerDiscount} from './customer-discount.model';
import {Observable} from 'rxjs';

@Injectable()
  export class CustomerDiscountService {

    constructor(private httpService: HttpService) {
    }

    readOne(mobile: number): Observable<CustomerDiscount> {
      return this.httpService.get(AppEndpoints.CUSTOMER_DISCOUNTS + '/' + mobile);
    }

    readAll(): Observable<CustomerDiscount[]> {
      return this.httpService.get(AppEndpoints.CUSTOMER_DISCOUNTS);
    }

    create(customerDiscount: CustomerDiscount): Observable<CustomerDiscount> {
      return this.httpService.successful().post(AppEndpoints.CUSTOMER_DISCOUNTS, customerDiscount);
    }

    update(discount: number, customerDiscount: CustomerDiscount): Observable<CustomerDiscount> {
      return this.httpService.put(AppEndpoints.CUSTOMER_DISCOUNTS + '/' + discount, customerDiscount);
    }

  }
