import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { AuthService } from '../../auth/services/auth.service';

export const canMatchUserGuard: CanMatchFn = (route, segments) => {
  console.log('CanMatch User');
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
