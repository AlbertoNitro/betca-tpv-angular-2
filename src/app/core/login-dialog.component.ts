import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material';

import {TokensService} from './tokens.service';
import {Staff} from '../home/staff/staff.model';
import {StaffService} from '../home/staff/staff.service';


@Component({
  templateUrl: 'login-dialog.component.html',
  styleUrls: ['dialog.component.css']
})
export class LoginDialogComponent {
  mobile: number;
  password: string;
  homeUrl: string;

  nowTime: Date;
  newMobile: string;
  staff: Staff;
  oldRecord: Staff[];
  newRecord: Staff;
  oldRecordeTime: Date;
  itemId: string;
  workHour: number;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private staffService: StaffService,
              private tokensService: TokensService, private router: Router) {
    this.homeUrl = data.homeUrl;
  }

  login() {
    this.tokensService.login(this.mobile, this.password).subscribe(
      () => this.router.navigate([this.homeUrl])
    );

    this.newMobile = this.mobile.toString();
    this.nowTime = new Date();
    this.staffService.search(
      this.newMobile,
      this.nowTime.getFullYear().toString(),
      (this.nowTime.getMonth() + 1).toString(),
      this.nowTime.getDate().toString())
      .subscribe( data => {
        this.oldRecord  = data;
        console.log(this.oldRecord);
        if (this.oldRecord.length > 0) {
          this.nowTime = new Date();
          this.oldRecordeTime =  new Date(this.oldRecord[0].lastLoginTime);
          this.itemId = this.oldRecord[0].id;
          this.workHour = this.oldRecord[0].workHours;
          this.staff =  {
            id : null,
            mobile: this.newMobile,
            year: (this.nowTime.getFullYear()).toString(),
            month: (this.nowTime.getMonth() + 1).toString(),
            day: this.nowTime.getDate().toString(),
            workHours: this.workHour,
            lastLoginTime: this.nowTime
          };
          this.staffService.updateLoginRecord(this.itemId, this.staff)
            // tslint:disable-next-line:no-shadowed-variable
            .subscribe(data => {
                this.newRecord = data;
                console.log(this.newRecord);
                console.log('finished..log out');
              }
            );
        } else {
          this.staff = {
            id : null,
            mobile: this.newMobile,
            year: (this.nowTime.getFullYear()).toString(),
            month: (this.nowTime.getMonth() + 1).toString(),
            day: this.nowTime.getDate().toString(),
            workHours: null,
            lastLoginTime: this.nowTime,
          };
          this.staffService.createNewLoginRecord(this.staff).subscribe();
        }
      });
  }
}
