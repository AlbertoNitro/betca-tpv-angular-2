import {Injectable} from '@angular/core';
import {concat, Observable, of} from 'rxjs';

import {AppEndpoints} from '../../../app-endpoints';
import {HttpService} from '../../../core/http.service';
import {User} from './user.model';
import {delay} from "rxjs/operators";

@Injectable()
export class UserService {

  constructor(private httpService: HttpService) {
  }

  createCustomerPointsByUserMobileAssured(mobile: number): Observable<any> {
    return this.httpService.post(AppEndpoints.CUSTOMER_POINTS, new Object(mobile));
  }

  create(user: User): Observable<User> {
    const userRequest = this.httpService.post(AppEndpoints.USERS, user);
    const customerPointsRequest = this.createCustomerPointsByUserMobileAssured(user.mobile);
    return concat(userRequest, customerPointsRequest);
  }

  read(mobile: number): Observable<User> {
    return this.httpService.get(AppEndpoints.USERS + '/' + mobile);
  }

  update(mobile: number, user: User): Observable<User> {
    return this.httpService.put(AppEndpoints.USERS + '/' + mobile, user);
  }

  readAll(): Observable<User[]> {
    return this.httpService.get(AppEndpoints.USERS);
  }

  getPassword(mobile: number): Observable<string> {
    return of('6').pipe(delay(1000));
  }

  updatePassword(mobile: number, newPassword: string): Observable<User> {
    return of({mobile: undefined, username: undefined}).pipe(delay(2000));
  }
}
