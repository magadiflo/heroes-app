import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { tap, map, Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const canMatchAuthGuard: CanMatchFn = (route, segments) => {
  console.log('CanMatch Auth');
  return checkAuthStatus();
};

export const canActivateAuthGuard: CanActivateFn = (route, state) => {
  console.log('CanActivate Auth');
  return checkAuthStatus();
};

const checkAuthStatus = (): Observable<boolean> => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.checkAuthentication()
    .pipe(
      tap(isAuthenticated => console.log("¿está autenticado?: " + isAuthenticated)),
      tap(isAuthenticated => {
        if (isAuthenticated) {
          router.navigate(['./heroes', 'list']);
        }
      }),
      map(isAuthenticate => !isAuthenticate) //* Si no está autenticado retornamos true para que pueda ingresar al login
    );
}
