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
    // TODO implement search with fields
    this.userService.readAll().subscribe(
      data => this.data = data
    );
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
