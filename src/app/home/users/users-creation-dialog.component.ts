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
  update: boolean;
  mobile: string;
  active: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private dialog: MatDialog,
              private message: MatSnackBar,
              private userService: UserService) {
    this.update = data.update;
    this.mobile = data.mobile;
    if (this.update) {
      this.userService.read(data.mobile).subscribe(
        user => {
          this.user = user;
          this.active = this.user.active.toString();
        }
      );
    }
  }

  createUser() {
    if (this.validateRequiredFields()) {
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

  updateUser() {
    if (this.validateRequiredFields()) {
      this.user.active = (this.active === 'true');
      this.userService.update(this.mobile, this.user).subscribe(
        () => this.dialog.closeAll()
        , () => this.message.open('Ups, something bad happened', null, {
          duration: 2000,
        })
        , () => this.message.open('User updated successfully', null, {
          duration: 2000,
        })
      );
    } else {
      this.message.open('The fields Mobile and Username are required', null, {
        duration: 2000,
      });
    }
  }

  validateRequiredFields(): boolean {
    if (this.user.mobile === null || this.user.username === null) {
      return false;
    } else if ('' === this.user.mobile.trim() || '' === this.user.username.trim()) {
      return false;
    }
    return true;
  }
}
