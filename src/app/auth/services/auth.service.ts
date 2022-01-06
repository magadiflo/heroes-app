import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  
  constructor(private http: HttpClient) { }
  
  public get auth(): Auth {
    return { ...this._auth! };
  }

  login(): Observable<Auth> {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        tap(auth => this._auth = auth),
        tap(auth => localStorage.setItem('token', auth.id))
      );
  }

  logout(): void {
    this._auth = undefined;
  }

  verificaAutenticacion(): Observable<boolean> {
    if(!localStorage.getItem('token')) {
      return of(false); //of(), convierte en un observable
    }
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        map(auth => {
          console.log('map', auth);
          this._auth = auth;
          return true;    
        })
      );
  }

}
