import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Staff} from '../staff/staff.model';
import {HttpService} from '../../core/http.service';
import {AppEndpoints} from '../../app-endpoints';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private httpService: HttpService) {
  }

  readAll(): Observable<Staff[]> {
    this.httpService.param('mobile', '');
    this.httpService.param('year', '');
    this.httpService.param('month', '');
    this.httpService.param('day', '');
    return this.httpService.get(AppEndpoints.STAFFS);
  }

  search(mobile: string, year: string, month: string, day: string): Observable<Staff[]> {
    this.httpService.param('mobile', mobile);
    this.httpService.param('year', year);
    this.httpService.param('month', month);
    this.httpService.param('day', day);
    return this.httpService.get(AppEndpoints.STAFFS);
  }

  createNewLoginRecord(newLoginRecord: Staff): Observable<Staff> {
    return this.httpService.post(AppEndpoints.STAFFS, newLoginRecord);
  }

  updateLoginRecord(id: string, newLoginRecord: Staff): Observable<Staff> {
    return this.httpService.put(AppEndpoints.STAFFS + '/' + id, newLoginRecord);
  }
}
