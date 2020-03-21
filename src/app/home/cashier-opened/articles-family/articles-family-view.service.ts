import {Injectable} from '@angular/core';
import {HttpService} from '../../../core/http.service';
import {AppEndpoints} from '../../../app-endpoints';
import {Observable} from 'rxjs';
import {ArticlesFamilyViewComplete} from './articles-family-view-complete.model';


@Injectable()
export class ArticlesFamilyViewService {

  constructor(private httpService: HttpService) {
  }

  readFamilyCompositeByDesc(familyDescription: string): Observable<ArticlesFamilyViewComplete[]> {
    return this.httpService
      .get(AppEndpoints.ARTICLES_FAMILY
        + AppEndpoints.ARTICLES_FAMILY_COMPOSITE
        + `?description=${familyDescription}`
      );
  }

}
