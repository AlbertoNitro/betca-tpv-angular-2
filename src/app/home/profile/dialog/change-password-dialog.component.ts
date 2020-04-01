import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../../shared/users/user.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  templateUrl: 'change-password-dialog.component.html',
})
export class ChangePasswordDialogComponent implements OnInit {

  passwordGroup2 = new FormGroup({
    password: new FormControl(''),
    new_password: new FormControl(''),
    confirm_new_password: new FormControl('')
  });

  passwordGroup = this.fb.group({
    password: ['', [Validators.required]],
    new_password: ['', [Validators.required]],
    confirm_new_password: ['', [Validators.required]]
  });

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private dialog: MatDialog,
              private userService: UserService,
              private fb: FormBuilder) {

  }

  ngOnInit() {
  }

  changePassword() {
  }
}
