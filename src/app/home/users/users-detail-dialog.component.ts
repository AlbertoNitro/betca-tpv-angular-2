import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {UserService} from '../shared/users/user.service';
import {User} from '../shared/users/user.model';

@Component({
  styleUrls: ['users-detail-dialog.component.css'],
  templateUrl: `users-detail-dialog.component.html`
})
export class UsersDetailDialogComponent {

  user: User;

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private userService: UserService) {
    this.userService.read(data.mobile).subscribe(
      user => {
        this.user = user;
      }
    );
  }
}
