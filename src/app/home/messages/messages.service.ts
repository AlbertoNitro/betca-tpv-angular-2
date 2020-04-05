import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {AppEndpoints} from '../../app-endpoints';
import {HttpService} from '../../core/http.service';
import {Messages} from './messages.model';
import {MessagesCreationModel} from './messagesCreation.model';

@Injectable()
export class MessagesService {

  constructor(private httpService: HttpService) {
  }

  readAll(): Observable<Messages[]> {
    return this.httpService.get(AppEndpoints.MESSAGES);
  }

  readById(id: number): Observable<Messages> {
    return this.httpService.get(AppEndpoints.MESSAGES + '/' + id);
  }

  readAllMessagesByToUser(toUserMobile: string): Observable<Messages[]> {
    return this.httpService.get(AppEndpoints.MESSAGES + AppEndpoints.TO_USER + '/' + toUserMobile);
  }

  readAllUnReadMessagesByToUser(toUserMobile: string): Observable<Messages[]> {
    return this.httpService.get(AppEndpoints.MESSAGES + AppEndpoints.TO_USER + '/' + toUserMobile + AppEndpoints.UNREAD);
  }

  createMessage(messagesCreationModel: MessagesCreationModel): Observable<Messages> {
    return this.httpService.post(AppEndpoints.MESSAGES, messagesCreationModel);
  }

  markMessageAsRead(id: string, readDate: Date): Observable<Messages> {
    this.httpService.param('readDate', readDate.toISOString());
    return this.httpService.put(AppEndpoints.MESSAGES + '/' + id);
  }
}
