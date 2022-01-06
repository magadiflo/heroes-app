import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.verificaAutenticacion()
        .pipe(
          tap(estaAutenticado => {
            if(!estaAutenticado){
              this.router.navigate(['/auth/login']);
            }
          })
        );
    //   if(this.authService.auth.id){
    //     return true;
    //   }
    //   console.log('Bloqueado por el AuthGuard - canActivate');    
    // return false;
  }

  //canLoad, previene que el usuario cargue el módulo. 
  //Si ya estaba previamente cargado el módulo, se podrá entrar
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
      return this.authService.verificaAutenticacion()
        .pipe(
          tap(estaAutenticado => {
            if(!estaAutenticado){
              this.router.navigate(['/auth/login']);
            }
          })
        );
    //   if(this.authService.auth.id){
    //     return true;
    //   }
    //   console.log('Bloqueado por el AuthGuard - canLoad');    
    // return false;
  }
}
