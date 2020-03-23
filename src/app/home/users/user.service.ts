import {Injectable} from '@angular/core';
import {EMPTY, Observable} from 'rxjs';

import {AppEndpoints} from '../../app-endpoints';
import {HttpService} from '../../core/http.service';
import {User} from './user.model';

@Injectable()
export class UserService {

  constructor(private httpService: HttpService) {
  }

  create(user: User): Observable<User> {
    // TODO
    return EMPTY;
  }

  read(mobile: number): Observable<User> {
    return this.httpService.get(AppEndpoints.USERS + '/' + mobile);
  }

  update(mobile: number, user: User): Observable<User> {
    // TODO
    return EMPTY;
  }

  delete(mobile: number): Observable<User> {
    // TODO
    return EMPTY;
  }

  readAll(): Observable<User[]> {
    return this.httpService.get(AppEndpoints.USERS);
  }
}
