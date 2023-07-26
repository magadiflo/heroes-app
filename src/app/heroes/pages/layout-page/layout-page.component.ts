import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../../auth/services/auth.service';
import { User } from 'src/app/auth/interfaces/user.interface';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-hero' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ];

  constructor(
    private _router: Router,
    private _authService: AuthService) { }


  public get user(): User | undefined {
    return this._authService.currentUser;
  }


  onLogout() {
    this._authService.logout();
    this._router.navigate(['/auth', 'login']);
  }

}
