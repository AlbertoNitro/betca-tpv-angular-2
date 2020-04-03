import {Component} from '@angular/core';

import {UserService} from '../shared/users/user.service';
import {User} from '../shared/users/user.model';
import {MatDialog, MatSnackBar} from '@angular/material';
import {UsersCreationDialogComponent} from './users-creation-dialog.component';
import {UsersDetailDialogComponent} from './users-detail-dialog.component';
import {CancelYesDialogComponent} from '../../core/cancel-yes-dialog.component';

@Component({
  templateUrl: `users.component.html`
})
export class UsersComponent {

  user: User;
  onlyCustomer = true;

  title = 'Users management';
  columns = ['mobile', 'username'];
  data: User[];

  constructor(private dialog: MatDialog, private userService: UserService, private message: MatSnackBar) {
    this.user = {mobile: null, username: null};
    this.data = null;
  }

  search() {
    if (this.user.mobile == null && this.user.username == null && this.user.dni == null && this.user.address == null) {
      this.userService.readAll().subscribe(
        data => this.data = data
      );
    } else {
      this.userService.search(this.user.mobile, this.user.username, this.user.dni, this.user.address).subscribe(
        data => {
          if (!this.onlyCustomer) {
            this.data = data;
          } else {
            this.data = [];
            data.forEach(user => {
              const customer = user.roles.findIndex(rol => rol === 'CUSTOMER');
              if (customer !== -1) {
                this.data.push(user);
              }
            });
            if (this.data.length === 0) {
              this.message.open('Users not found', null, {
                duration: 2500,
              });
            }
          }
        }
      );
    }
  }

  resetSearch() {
    this.user = {mobile: null, username: null};
  }


  create() {
    this.dialog.open(UsersCreationDialogComponent, {
      data: {
        update: false
      }
    }).afterClosed().subscribe(
      () => this.search()
    );
  }

  read(user: User) {
    this.dialog.open(UsersDetailDialogComponent, {
      data: {
        mobile: user.mobile
      }
    });
  }

  update(user: User) {
    this.dialog.open(UsersCreationDialogComponent, {
      data: {
        mobile: user.mobile,
        update: true
      }
    }).afterClosed().subscribe(
      () => this.search()
    );
  }

  delete(user: User) {
    this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
      result => {
        if (result) {
          user.active = false;
          this.userService.update(user.mobile, user).subscribe(
            () => this.search()
            , () => this.message.open('Ups, something bad happened', null, {
              duration: 2000,
            })
            , () => this.message.open('User disabled successfully', null, {
              duration: 2000,
            })
          );
        }
      }
    );
  }
}
