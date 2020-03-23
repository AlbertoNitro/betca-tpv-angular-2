import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar} from '@angular/material';
import {UserService} from './user.service';
import {User} from './user.model';
import {FormControl, Validators} from '@angular/forms';

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
  mobile: number;
  active: string;
  emailFormControl = new FormControl('', [Validators.email]);

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

  getErrorMessage() {
    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }

  createUser() {
    if (this.validateRequiredFields() && !this.emailFormControl.hasError('email')) {
      this.userService.create(this.user).subscribe(
        () => this.dialog.closeAll()
        , () => this.message.open('Ups, something bad happened', null, {
          duration: 2000,
        })
        , () => this.message.open('User created successfully', null, {
          duration: 2000,
        })
      );
    }
  }

  updateUser() {
    if (this.validateRequiredFields() && !this.emailFormControl.hasError('email')) {
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
    }
  }

  validateRequiredFields(): boolean {
    let valid = true;
    if (this.user.mobile === null || this.user.username === null) {
      valid = false;
    } else if ('' === this.user.mobile.toString().trim() || '' === this.user.username.trim()) {
      valid = false;
    }
    if (valid === false) {
      this.message.open('The fields Mobile and Username are required', null, {
        duration: 2000,
      });
    }
    return valid;
  }
}
