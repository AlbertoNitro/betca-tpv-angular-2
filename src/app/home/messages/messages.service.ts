import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {AppEndpoints} from '../../app-endpoints';
import {HttpService} from '../../core/http.service';
import {Messages} from './messages.model';

@Injectable()
export class MessagesService {

  constructor(private httpService: HttpService) {
  }

  create(messages: Messages): Observable<Messages> {
    return this.httpService.post(AppEndpoints.MESSAGES, messages);
  }

  updateAsRead(messages: Messages): Observable<Messages> {
    return this.httpService.put(AppEndpoints.MESSAGES, messages);
  }

  readAll(mobile: number): Observable<Messages[]> {
    return this.httpService.get(AppEndpoints.MESSAGES + '/' + mobile);
  }

  readAllNewMessages(mobile: number): Observable<Messages[]> {
    return this.httpService.get(AppEndpoints.MESSAGES + '/' + mobile + '/news');
  }
}
