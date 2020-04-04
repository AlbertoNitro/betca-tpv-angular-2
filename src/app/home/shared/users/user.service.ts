import {Injectable} from '@angular/core';
import {concat, Observable} from 'rxjs';

import {AppEndpoints} from '../../../app-endpoints';
import {HttpService} from '../../../core/http.service';
import {User} from './user.model';
import {UserCredential} from './user-credential.model';

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

  search(mobile: number, username: string, dni: string, address: string): Observable<User[]> {
    this.httpService.param('mobile', mobile ? mobile.toString() : '');
    this.httpService.param('username', username ? username : '');
    this.httpService.param('dni', dni ? dni : '');
    this.httpService.param('address', address ? address : '');
    return this.httpService.get(AppEndpoints.USERS + '/' + 'search');
  }

  updatePassword(mobile: number, newPassword: string): Observable<User> {
    const userCredential: UserCredential = {mobile, newPassword};
    return this.httpService.patch(AppEndpoints.USER_PASSWORD + '/' + mobile, userCredential);
  }

  updateRoles(mobile: number, user: User): Observable<User> {
    return this.httpService.patch(AppEndpoints.USERS + '/' + mobile, user);
  }
}
