import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material';

import {TokensService} from './tokens.service';
import {Staff} from '../home/staff/staff.model';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
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
    // if (
    //     this.staffService.search(
    //       this.newMobile,
    //       this.nowTime.getFullYear().toString(),
    //       (this.nowTime.getMonth() + 1).toString(),
    //       this.nowTime.getDate().toString()
    //     )._isScalar === true)
    // {
    //   this.staff = {
    //     id : null,
    //     mobile: this.newMobile,
    //     year: (this.nowTime.getFullYear()).toString(),
    //     month: (this.nowTime.getMonth() + 1).toString(),
    //     day: this.nowTime.getDate().toString(),
    //     workHours: null,
    //     lastLoginTime: this.nowTime,
    //   };
    //   this.staffService.updateLoginRecord(this.staff);
    // } else {
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
    // }
  }
}
