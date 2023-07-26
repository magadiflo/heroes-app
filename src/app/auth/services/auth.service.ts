import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user.interface';
import { Observable, tap } from 'rxjs';


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

  login(email: string, password: string): Observable<User> {
    return this._http.get<User>(`${this.apiUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        tap(user => localStorage.setItem('token', 'asrfa.asdf.asdf')),
      );
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }

}
