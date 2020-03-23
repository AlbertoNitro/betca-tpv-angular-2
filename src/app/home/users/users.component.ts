import {Component} from '@angular/core';

import {UserService} from './user.service';
import {User} from './user.model';
import {MatDialog} from '@angular/material';
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

  constructor(private dialog: MatDialog, private userService: UserService) {
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
    });
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
    });
  }

  delete(user: User) {
    this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
      result => {
        if (result) {
          this.userService.delete(user.mobile).subscribe(
            response => {
              // TODO
              console.log(response);
              this.search();
            }
          );
        }
      }
    );
  }
}
