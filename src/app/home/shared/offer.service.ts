import {Injectable} from '@angular/core';
import {HttpService} from 'src/app/core/http.service';
import {Observable} from 'rxjs';
import {Offer} from './offer.model';
import {AppEndpoints} from 'src/app/app-endpoints';

@Injectable()
export class OfferService {

  constructor(private httpService: HttpService) {
  }

  public create(offer: Offer): Observable<Offer> {
    return this.httpService.post(AppEndpoints.OFFERS, offer);
  }

  public read(id?: string): Observable<Offer> {
    return this.httpService.get(`${AppEndpoints.OFFERS}/${id}`);
  }

  public delete(offer: Offer): Observable<void> {
    return this.httpService.delete(AppEndpoints.OFFERS + '/' + offer.id);
  }

  public print(offer: Offer): Observable<any> {
    return this.httpService.pdf().get(AppEndpoints.OFFERS + '/' + offer.id + AppEndpoints.PRINT);
  }

  public search(registrationDate: Date, expirationDate: Date): Observable<Array<Offer>> {
    this.httpService.param('registrationDate', registrationDate.toISOString());
    this.httpService.param('expirationDate', expirationDate.toISOString());
    return this.httpService.get(`${AppEndpoints.OFFERS}/search`);
  }
}
