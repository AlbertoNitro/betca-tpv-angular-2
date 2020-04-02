import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar} from '@angular/material';
import {UserService} from '../shared/users/user.service';
import {User} from '../shared/users/user.model';
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
  mobileFormControl = new FormControl('', [Validators.required]);
  usernameFormControl = new FormControl('', [Validators.required]);

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private dialog: MatDialog,
              private message: MatSnackBar,
              private userService: UserService) {
    this.update = data.update;
    if (this.update) {
      this.mobile = data.mobile;
      this.userService.read(data.mobile).subscribe(
        user => {
          this.user = user;
          this.active = this.user.active.toString();
        }
      );
    }
  }

  getErrorMessageEmail() {
    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessageMobile() {
    return this.mobileFormControl.hasError('required') ? 'You must enter a value' : '';
  }

  getErrorMessageUsername() {
    return this.usernameFormControl.hasError('required') ? 'You must enter a value' : '';
  }

  createUser() {
    this.userService.create(this.user).subscribe(
      () => this.dialog.closeAll()
      , error => this.errorControl(error.error)
      , () => this.message.open('User created successfully', null, {
        duration: 2000,
      })
    );
  }

  updateUser() {
    this.user.active = (this.active === 'true');
    this.userService.update(this.mobile, this.user).subscribe(
      () => this.dialog.closeAll()
      , error => this.errorControl(error.error)
      , () => this.message.open('User updated successfully', null, {
        duration: 2000,
      })
    );
  }

  invalidUser(): boolean {
    return this.mobileFormControl.hasError('required') || this.usernameFormControl.hasError('required')
      || this.emailFormControl.hasError('email');
  }

  errorControl(error: string) {
    let messageError;
    switch (error) {
      case 'ConflictException':
        messageError = 'User with this mobile already exists';
        break;
      case 'MethodArgumentNotValidException':
        messageError = 'The mobile format is incorrect';
        break;
      default:
        messageError = 'Ups, something bad happened';
        break;
    }
    this.message.open(messageError, null, {
      duration: 2000,
    });
  }
}
