import {Injectable} from '@angular/core';
import {HttpService} from '../../../core/http.service';
import {Observable} from 'rxjs';
import {AppEndpoints} from '../../../app-endpoints';
import {Tag} from './tag.model';

@Injectable()
export class TagService {

  constructor(private httpService: HttpService) {
  }

  public readAll(): Observable<Tag[]> {
    return this.httpService.get(AppEndpoints.TAGS);
  }

  public readOne(description: string): Observable<Tag> {
    return this.httpService.get(AppEndpoints.TAGS + '/' + description);
  }
  public create(tag: Tag): Observable<Tag> {
    return this.httpService.post(AppEndpoints.TAGS, tag);
  }
  public print(tag: Tag): Observable<any> {
    return this.httpService.pdf().get('/' + AppEndpoints.TAGS + '/' + tag.id + AppEndpoints.PRINT);
  }
  public delete(tag: Tag): Observable<void> {
    return this.httpService.delete('/' + AppEndpoints.TAGS + '/' + tag.id);
  }
  public update(tag: Tag): Observable<void> {
    return this.httpService.put(AppEndpoints.TAGS + '/' + tag.id, tag);
  }
}
