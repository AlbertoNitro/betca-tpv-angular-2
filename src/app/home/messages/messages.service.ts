import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {AppEndpoints} from '../../app-endpoints';
import {HttpService} from '../../core/http.service';
import {Messages} from './messages.model';

@Injectable()
export class MessagesService {

  constructor(private httpService: HttpService) {
  }

  // GET /messages
  readAll(): Observable<Messages[]> {
    return this.httpService.get(AppEndpoints.MESSAGES);
  }

  // GET /messages{id}
  readById(mobile: number): Observable<Messages[]> {
    return this.httpService.get(AppEndpoints.MESSAGES + '/' + mobile);
  }

  // GET /messages?toUserMobile={toUserMobile}
  readAllMessagesByToUser(toUserMobile: number): Observable<Messages[]> {
    this.httpService.param('toUserMobile', toUserMobile ? toUserMobile.toString() : '');
    return this.httpService.get(AppEndpoints.MESSAGES + AppEndpoints.MY_MESSAGES);
  }

  // GET /messages/unread?toUserMobile={toUserMobile}
  readAllUnReadMessagesByToUser(toUserMobile: number): Observable<Messages[]> {
    this.httpService.param('toUserMobile', toUserMobile ? toUserMobile.toString() : '');
    return this.httpService.get(AppEndpoints.MESSAGES + AppEndpoints.MY_MESSAGES + AppEndpoints.UNREAD);
  }

  // POST /messages (Messages)
  createMessage(messages: Messages): Observable<Messages> {
    return this.httpService.post(AppEndpoints.MESSAGES, messages);
  }

  // PUT /messages/{id}?readDate={readDate}
  markMessageAsRead(id: number, readDate: Date): Observable<Messages> {
    this.httpService.param('readDate', readDate.toISOString());
    return this.httpService.put(AppEndpoints.MESSAGES + '/' + id);
  }
}
