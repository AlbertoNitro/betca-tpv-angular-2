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
import {ArticlesFamilyDialogComponent} from './articles/articles-family-dialog.component';

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
  newRecord: Staff;
  oldRecordeTime: Date;
  itemId: string;
  workHour: number;
  isManagerOrOperator: boolean;
  loginTime: Date;


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
    this.isManagerOrOperator = tokensService.isOperator() || tokensService.isManager();
  }

  isAdmin(): boolean {
    return this.tokensService.isAdmin();
  }

  isManager(): boolean {
    return this.tokensService.isManager();
  }

  isOperator(): boolean {
    return this.tokensService.isOperator();
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
    this.loginTime = this.tokensService.logout();
    if (this.isManagerOrOperator) {
      this.nowTime = new Date();
      if (this.loginTime === null) {
        this.staffService.search(
          this.mobile.toString(),
          this.nowTime.getFullYear().toString(),
          (this.nowTime.getMonth() + 1).toString(),
          this.nowTime.getDate().toString()
        )
          .subscribe( data => {
            this.oldRecord  = data;
            console.log(this.oldRecord);
            this.nowTime = new Date();
            this.oldRecordeTime =  new Date(this.oldRecord[0].lastLoginTime);
            this.itemId = this.oldRecord[0].id;
            this.workHour = this.nowTime.getHours() - this.oldRecordeTime.getHours() +
              (this.nowTime.getMinutes() - this.oldRecordeTime.getMinutes()) / 60 +
              (this.nowTime.getSeconds() - this.oldRecordeTime.getSeconds()) / 3600;
            this.staff =  {
              id : null,
              mobile: this.mobile,
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
                }
              );
          });
      } else {
        this.staffService.search(
          this.mobile.toString(),
          this.loginTime.getFullYear().toString(),
          (this.loginTime.getMonth() + 1).toString(),
          this.loginTime.getDate().toString()
        )
          .subscribe( data => {
            this.oldRecord  = data;
            this.nowTime = new Date();
            this.oldRecordeTime =  new Date(this.oldRecord[0].lastLoginTime);
            this.itemId = this.oldRecord[0].id;
            this.workHour = 24 - this.oldRecordeTime.getHours() +
              (60 - this.oldRecordeTime.getMinutes()) / 60 +
              (60 - this.oldRecordeTime.getSeconds()) / 3600;
            this.staff =  {
              id : null,
              mobile: this.mobile,
              year: (this.loginTime.getFullYear()).toString(),
              month: (this.loginTime.getMonth() + 1).toString(),
              day: this.loginTime.getDate().toString(),
              workHours: this.workHour,
              lastLoginTime: new Date(this.loginTime.getFullYear(), (this.loginTime.getMonth() + 1),
                this.loginTime.getDate(), 0 , 0 , 0)
            };
            this.staffService.updateLoginRecord(this.itemId, this.staff)
              // tslint:disable-next-line:no-shadowed-variable
              .subscribe(data => {
                  this.newRecord = data;
                }
              );
          });
        const date = new Date(this.loginTime);
        console.log('need to write work hours for the pastdays');
        while (!(date.getDate() === this.nowTime.getDate() - 1 && date.getMonth() === this.nowTime.getMonth())) {
          date.setDate(date.getDate() + 1);
          console.log(date);
          this.staff = {
            id : null,
            mobile: this.mobile,
            year: (date.getFullYear()).toString(),
            month: (date.getMonth() + 1).toString(),
            day: date.getDate().toString(),
            workHours: 24,
            lastLoginTime: this.loginTime,
          };
          this.staffService.createNewLoginRecord(this.staff).subscribe();
        }
        date.setDate(date.getDate() + 1);
        console.log(date);
        this.workHour = date.getHours() +
          (date.getMinutes()) / 60 +
          (date.getSeconds()) / 3600;
        this.staff = {
          id : null,
          mobile: this.mobile,
          year: (date.getFullYear()).toString(),
          month: (date.getMonth() + 1).toString(),
          day: date.getDate().toString(),
          workHours: this.workHour,
          lastLoginTime: this.loginTime,
        };
        this.staffService.createNewLoginRecord(this.staff).subscribe();
      }
    }
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

  openFamilyCreator() {
    this.dialog.open(ArticlesFamilyDialogComponent).afterClosed().subscribe(
      () => this.cashier()
    );
  }

}
