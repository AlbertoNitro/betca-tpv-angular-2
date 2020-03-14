import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {map} from 'rxjs/operators';

import {AppEndpoints} from '../app-endpoints';
import {HttpService} from '../core/http.service';
import {TokensService} from '../core/tokens.service';
import {CancelYesDialogComponent} from '../core/cancel-yes-dialog.component';
import {CashierService} from './shared/cashier.service';
import {AdminsService} from './admins.service';
import {UserService} from './users/user.service';
import {SystemService} from './system.service';
import {CashierClosureDialogComponent} from './cashier-opened/cashier-closure/cashier-closure-dialog.component';
import {CashMovementsDialogComponent} from './cashier-opened/cashier-closure/cash-movements/cash-movements-dialog.component';
import {Staff} from './staff/staff.model';
import {StaffService} from './staff/staff.service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],

})
export class HomeComponent {
  backend: string;

  cashierClosed: boolean;
  username: string;
  mobile: string;

  nowTime: Date;
  staff: Staff;
  oldRecord: Staff[];

  constructor(private router: Router, private dialog: MatDialog, private httpService: HttpService,
              private staffService: StaffService,
              private tokensService: TokensService, private userService: UserService, private cashierService: CashierService,
              private adminsService: AdminsService, private systemService: SystemService) {
    systemService.readVersion().subscribe(
      appInfo => this.backend = appInfo.version + '(' + appInfo.profile + ')'
    );
    this.username = tokensService.getName();
    this.mobile = tokensService.getMobile().toString();
    this.cashierClosed = true;
    this.cashier();
    this.oldRecord = null;
  }

  isAdmin(): boolean {
    return this.tokensService.isAdmin();
  }

  isManager(): boolean {
    return this.tokensService.isManager();
  }

  cashier() {
    this.cashierService.readLast()
      .pipe(map(cashierLast => cashierLast.closed))
      .subscribe(
        closed => {
          this.cashierClosed = closed;
          if (closed) {
            this.router.navigate(['home', 'cashier-closed']);
          } else {
            this.router.navigate(['home', 'cashier-opened']);
          }
        }
      );
  }

  deleteDb() {
    this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
      result => {
        if (result) {
          this.adminsService.deleteDb();
        }
      });
  }

  seedDb() {
    this.adminsService.seedDb();
  }

  logout() {
    this.tokensService.logout();

    this.nowTime = new Date();
    this.staffService.search(
        this.mobile.toString(),
        this.nowTime.getFullYear().toString(),
        (this.nowTime.getMonth() + 1).toString(),
        this.nowTime.getDate().toString()
      )
      .subscribe( {
        next(data) { this.oldRecord = data; },
        complete() {
          this.nowTime = new Date();
          // tslint:disable-next-line:prefer-const
          let oldRecordeTime =  new Date(this.oldRecord[0].lastLoginTime);
          const workHour = this.nowTime.getHours() - oldRecordeTime.getHours() +
            (this.nowTime.getMinutes() - oldRecordeTime.getMinutes()) / 60 +
            (this.nowTime.getSeconds() - oldRecordeTime.getSeconds()) / 3600;
          this.staff =  {
            id : null,
            mobile: this.mobile,
            year: (this.nowTime.getFullYear()).toString(),
            month: (this.nowTime.getMonth() + 1).toString(),
            day: this.nowTime.getDate().toString(),
            workHours: workHour,
            lastLoginTime: this.nowTime
          };
          // this.staffService.updateLoginRecord(this.staff);
          // console.log('finished..log out');
        }
      });
  }

  closeCashier() {
    this.dialog.open(CashierClosureDialogComponent).afterClosed().subscribe(
      () => this.cashier()
    );
  }

  openCashier() {
    this.httpService.post(AppEndpoints.CASHIER_CLOSURES).subscribe(
      () => this.cashier()
    );
  }

  moveCash() {
    this.dialog.open(CashMovementsDialogComponent).afterClosed().subscribe(
      () => this.cashier()
    );
  }

}
