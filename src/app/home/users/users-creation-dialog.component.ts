import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar} from '@angular/material';
import {UserService} from './user.service';
import {User} from './user.model';

@Component({
  styleUrls: ['users-creation-dialog.component.css'],
  templateUrl: `users-creation-dialog.component.html`
})
export class UsersCreationDialogComponent {

  user: User = {
    mobile: null,
    username: null,
    email: null,
    dni: null,
    address: null
  };

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private dialog: MatDialog,
              private message: MatSnackBar,
              private userService: UserService) {
  }

  createUser() {
    if (this.user.mobile !== null && this.user.username !== null) {
      this.userService.create(this.user).subscribe(
        () => this.dialog.closeAll()
        , () => this.message.open('Ups, something bad happened', null, {
          duration: 2000,
        })
        , () => this.message.open('User created successfully', null, {
          duration: 2000,
        })
      );
    } else {
      this.message.open('The fields Mobile and Username are required', null, {
        duration: 2000,
      });
    }
  }
}
