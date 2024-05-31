import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

export type Role = 'admin' | 'user';
export interface SelectRole {
  value: Role;
  viewValue: string;
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  public selectRole = 'user';
  public optionRoles: SelectRole[] = [
    { viewValue: 'Admin', value: 'admin' },
    { viewValue: 'User', value: 'user' },
  ];

  constructor(
    private _router: Router,
    private _authService: AuthService) { }

  onLogin(): void {
    console.log(this.selectRole);
    this._authService.login('user@gmail.com', '123456', this.selectRole)
      .subscribe(user => {
        console.log(user);
        this._router.navigate(['/heroes', 'list']);
      });
  }

}
