import {Component, OnInit} from '@angular/core';
import {User} from '../shared/users/user.model';
import {UserService} from '../shared/users/user.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TokensService} from '../../core/tokens.service';
import {ChangeUserRoleDialogComponent} from './dialog/change-user-role-dialog.component';

@Component({
  templateUrl: `users-roles.component.html`,
  styleUrls: ['users-roles.component.css']
})

export class UsersRolesComponent implements OnInit {
  title = 'Roles Users Management';
  roles: string[] = ['Admin', 'Manager', 'Operator', 'Customer'];
  users: User[];
  displayedColumns: string[] = ['username', 'mobile', 'role', 'changeRole'];

  constructor(private dialog: MatDialog, private userService: UserService, private message: MatSnackBar,
              private tokensService: TokensService) {
    this.userService.readAll().subscribe(
      users => {
        this.users = users;
      }
    );
  }

  ngOnInit(): void {
  }

  isAdmin(): boolean {
    return this.tokensService.isAdmin();
  }

  isDisabled(roles): boolean {
    if (this.isAdmin()) {
      return false;
    } else {
      return roles.includes('ADMIN');
    }
  }

  changeRole(user: User) {
    this.dialog.open(ChangeUserRoleDialogComponent, {
      data: {
        mobile: user.mobile
      }
    });
  }

}
