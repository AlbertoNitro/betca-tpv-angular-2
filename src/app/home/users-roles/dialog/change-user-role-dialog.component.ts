import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../shared/users/user.service';
import {User} from '../../shared/users/user.model';
import {TokensService} from '../../../core/tokens.service';

@Component({
  templateUrl: 'change-user-role-dialog.component.html'
})
export class ChangeUserRoleDialogComponent implements OnInit {
  user: User;
  roles: any[];

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
              private dialog: MatDialog,
              private message: MatSnackBar,
              private userService: UserService,
              private tokensService: TokensService) {
    this.user = data.user;
    this.roles = [{rol: 'ADMIN', checked: false}, {rol: 'MANAGER', checked: false},
      {rol: 'OPERATOR', checked: false}, {rol: 'CUSTOMER', checked: false}];
    this.roles.forEach((role, index) => {
      const found = this.user.roles.findIndex(rol => {
        return rol === role.rol;
      });
      if (found !== -1) {
        this.roles[index].checked = true;
      }
    });
  }

  ngOnInit() {
  }

  isAdmin() {
    return this.tokensService.isAdmin();
  }

  verifyRole(role: string) {
    return !this.isAdmin() && role === this.roles[0].rol;
  }

  updateRoles() {
    const roles = [];
    this.roles.forEach(rol => {
      if (rol.checked) {
        roles.push(rol.rol);
      }
    });
    const user: User = {mobile: this.user.mobile, username: this.user.username, roles};
    this.userService.updateRoles(this.user.mobile, user).subscribe(
      () => {
      },
      () => this.message.open('Ups, something bad happened', null, {duration: 2500}),
      () => this.message.open('The roles the user ' + this.user.username + ' have been updated successfully', null, {duration: 2500})
    );
  }

  changeStatus(rol) {
    const found = this.roles.findIndex(role => {
      return rol === role.rol;
    });
    this.roles[found].checked = !this.roles[found].checked;
  }
}
