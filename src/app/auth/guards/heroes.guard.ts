import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';


export const canMatchHeroesGuard: CanMatchFn = (route, segments) => {
  console.log('CanMatch Heroes');
  return checkAuthStatus();
};

export const canActivateHeroesGuard: CanActivateFn = (route, state) => {
  console.log('CanActivate Heroes');
  return checkAuthStatus();
};

const checkAuthStatus = (): Observable<boolean> => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.checkAuthentication()
    .pipe(
      tap(isAuthenticated => console.log("¿está autenticado?: " + isAuthenticated)),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          router.navigate(['/auth', 'login']);
        }
      }),
    );
}
