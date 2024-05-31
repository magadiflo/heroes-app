import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl: string = environment.apiUrl;
  private user?: User;

  public get currentUser(): User | undefined {
    return this.user ? structuredClone(this.user) : undefined;
  }

  constructor(private _http: HttpClient) { }

  checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');
    // TODO Aquí iríamos al backend a verificar si el token es válido

    return this._http.get<User>(`${this.apiUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        map(user => !!user), //* !!user, lo único que hace es asegurarse de devolver un booleano
        catchError(err => of(false))
      );
  }

  login(email: string, password: string, role: string): Observable<User> {
    return this._http.get<User>(`${this.apiUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        tap(user => {
          localStorage.setItem('token', `${user.id}.asrfa.asdf.asdf`);
          localStorage.setItem('role', role);
        }),
      );
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }

}
