import {Component, OnInit} from '@angular/core';

import {TokensService} from '../../core/tokens.service';
import {UserService} from '../shared/users/user.service';
import {User} from '../shared/users/user.model';
import {ChangePasswordDialogComponent} from './dialog/change-password-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  templateUrl: `profile.component.html`,
  styleUrls: ['profile.component.css']
})

export class ProfileComponent implements OnInit {
  title: string;
  user: User;

  constructor(private tokensService: TokensService, private userService: UserService, private dialog: MatDialog) {
    this.title = 'Profile';
    this.user = {mobile: null, username: null};
  }

  ngOnInit() {
    const mobile = this.tokensService.getMobile();
    if (mobile) {
      this.userService.read(mobile).subscribe(
        user => {
          this.user = user;
        }
      );
    }
  }

  changePassword() {
    this.dialog.open(ChangePasswordDialogComponent, {
      data: {
        mobile: this.user.mobile
      }
    });
  }
}
