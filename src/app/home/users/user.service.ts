import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {AppEndpoints} from '../../app-endpoints';
import {HttpService} from '../../core/http.service';
import {User} from './user.model';

@Injectable()
export class UserService {

  constructor(private httpService: HttpService) {
  }

  create(user: User): Observable<User> {
    return this.httpService.post(AppEndpoints.USERS, user);
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
}
