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
  readById(id: number): Observable<Messages> {
    return this.httpService.get(AppEndpoints.MESSAGES + '/' + id);
  }

  // GET /messages/to-user/{toUserMobile}
  readAllMessagesByToUser(toUserMobile: number): Observable<Messages[]> {
    return this.httpService.get(AppEndpoints.MESSAGES + AppEndpoints.TO_USER + '/' + toUserMobile);
  }

  // GET /messages/to-user/{toUserMobile}/unread
  readAllUnReadMessagesByToUser(toUserMobile: number): Observable<Messages[]> {
    return this.httpService.get(AppEndpoints.MESSAGES + AppEndpoints.TO_USER + '/' + toUserMobile + AppEndpoints.UNREAD);
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
