import {Injectable} from '@angular/core';
import {HttpService} from '../../../core/http.service';
import {Observable} from 'rxjs';
import {AppEndpoints} from '../../../app-endpoints';
import {Tag} from './tag.model';

@Injectable()
export class TagService {

  constructor(private httpService: HttpService) {
  }

  readAll(): Observable<Tag[]> {
    return this.httpService.get(AppEndpoints.TAGS);
  }

  readOne(description: string): Observable<Tag> {
    return this.httpService.get(AppEndpoints.TAGS + '/' + description);
  }
}
