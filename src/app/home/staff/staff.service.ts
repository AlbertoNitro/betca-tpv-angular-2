import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Staff} from '../staff/staff.model';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {HttpService} from '../../core/http.service';
import {AppEndpoints} from '../../app-endpoints';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  staffTest: Staff[] = [
    {
      id: '1',  mobile: '661',  year: '2020', month: '1',  day: '1',  workHours: 8,  lastLoginTime: new Date(2020, 1, 1, 9, 0, 0)
    },
    {
      id : '2', mobile: '662',  year: '2020', month: '1',  day: '1',  workHours: 8,  lastLoginTime: new Date(2020, 1, 1, 9, 0, 0)
    },
    {
      id : '2', mobile: '6',  year: '2020', month: '3',  day: '12',  workHours: 0,  lastLoginTime: new Date(2020, 3, 12, 9, 0, 0)
    },
  ];

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



  // updateLoginRecord(newLoginRecord: Staff): Observable<Staff> {
  //   // tslint:disable-next-line:prefer-for-of
  //   let flag = 0;
  //   // tslint:disable-next-line:prefer-for-of
  //   for (let i = 0; i < this.staffTest.length; i++) {
  //     const data = this.staffTest[i];
  //     if (data.mobile === newLoginRecord.mobile && data.month === newLoginRecord.month && data.day === newLoginRecord.day) {
  //       if (isNotNullOrUndefined(newLoginRecord.workHours)) {
  //         data.workHours = newLoginRecord.workHours;
  //       }
  //       data.lastLoginTime = newLoginRecord.lastLoginTime;
  //       return of(data);
  //     }
  //     flag = flag + 1;
  //   }
  //   if (flag > 0) {
  //     return null;
  //   }
  // }
}
