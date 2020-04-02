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
  passwordGroup = this.fb.group({
    new_password: ['', [Validators.required]],
    confirm_new_password: ['', [Validators.required]]
  });

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private dialog: MatDialog,
              private message: MatSnackBar,
              private userService: UserService,
              private fb: FormBuilder) {
    this.mobile = data.mobile;
  }

  ngOnInit() {
  }

  changePassword() {
    const newPasword = this.passwordGroup.get('new_password').value;
    this.userService.updatePassword(this.mobile, newPasword).subscribe(
      () => {
      },
      error => {
        this.message.open('An error has ocurred', null, {duration: 2500});
        console.log('Change password error: ' + JSON.stringify(error));
      },
      () => this.message.open('Password updated successfully', null, {duration: 2500})
    );
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
    return this.passwordGroup.valid && !this.passwordsDifferent();
  }

}
