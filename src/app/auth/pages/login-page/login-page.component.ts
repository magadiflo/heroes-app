import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  constructor(
    private _router: Router,
    private _authService: AuthService) { }

  onLogin(): void {
    this._authService.login('user@gmail.com', '123456')
      .subscribe(user => {
        console.log(user);
        this._router.navigate(['/heroes', 'list']);
      });
  }

}
