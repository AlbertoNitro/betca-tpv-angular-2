import {Component, OnInit} from '@angular/core';

import {TokensService} from '../../core/tokens.service';
import {UserService} from '../shared/users/user.service';
import {User} from '../shared/users/user.model';

@Component({
  templateUrl: `profile.component.html`,
  styleUrls: ['profile.component.css']
})

export class ProfileComponent implements OnInit {
  title: string;
  user: User;

  constructor(private tokensService: TokensService, private userService: UserService) {
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
}
