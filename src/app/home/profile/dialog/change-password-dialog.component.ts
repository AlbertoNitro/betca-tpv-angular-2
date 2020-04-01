import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../../shared/users/user.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  templateUrl: 'change-password-dialog.component.html',
  styleUrls: ['change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent implements OnInit {
  mobile: number;
  passwordUser: string;
  passwordGroup = this.fb.group({
    password: ['', [Validators.required]],
    new_password: ['', [Validators.required]],
    confirm_new_password: ['', [Validators.required]]
  });

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private dialog: MatDialog,
              private message: MatSnackBar,
              private userService: UserService,
              private fb: FormBuilder) {
    this.mobile = data.mobile;
    this.userService.getPassword(this.mobile).subscribe(
      password => {
        this.passwordUser = password;
      }
    );
  }

  ngOnInit() {
  }

  changePassword() {
    this.userService.updatePassword(this.mobile, this.passwordUser).subscribe(
      () => this.message.open('Password updated successfully', null, {
        duration: 2500,
      })
    );
  }

  passwordIncorrect(): boolean {
    const passFormControl = this.passwordGroup.get('password');
    if (passFormControl.touched) {
      return passFormControl.value !== this.passwordUser;
    }
    return false;
  }

  passwordsDifferent() {
    const newPassFormControl = this.passwordGroup.get('new_password');
    const confirmNewPassFormControl = this.passwordGroup.get('confirm_new_password');
    if (newPassFormControl.touched && confirmNewPassFormControl.touched) {
      return newPassFormControl.value !== confirmNewPassFormControl.value;
    }
    return false;
  }

  formIsValid(): boolean {
    return this.passwordGroup.valid && !this.passwordsDifferent() && !this.passwordIncorrect();
  }

}
