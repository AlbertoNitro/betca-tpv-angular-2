import {Component} from '@angular/core';
import {MatDialogRef, MatSnackBar} from '@angular/material';

import {FormControl, Validators} from '@angular/forms';
import {User} from '../../../shared/users/user.model';
import {UserService} from '../../../shared/users/user.service';

@Component({
  styleUrls: ['users-quick-creation-dialog.component.css'],
  templateUrl: `users-quick-creation-dialog.component.html`
})
export class UsersQuickCreationDialogComponent {

  user: User;
  mobileFormControl = new FormControl('', [Validators.required]);
  usernameFormControl = new FormControl('', [Validators.required]);

  constructor(private dialogRef: MatDialogRef<UsersQuickCreationDialogComponent>,
              private message: MatSnackBar,
              private userService: UserService) {
  }

  getErrorMessageMobile() {
    return this.mobileFormControl.hasError('required') ? 'You must enter a value' : '';
  }

  getErrorMessageUsername() {
    return this.usernameFormControl.hasError('required') ? 'You must enter a value' : '';
  }

  createUser() {
    this.userService.create(this.user).subscribe(
      newUser => this.dialogRef.close(newUser)
      , error => this.errorControl(error.error)
      , () => this.message.open('User created successfully', null, {
        duration: 2000,
      })
    );
  }

  invalidUser(): boolean {
    return this.mobileFormControl.hasError('required') || this.usernameFormControl.hasError('required');
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
