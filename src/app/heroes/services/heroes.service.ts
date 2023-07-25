import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Hero } from '../interfaces/hero.interface';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private readonly apiUrl: string = environment.apiUrl;


  constructor(private _http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this._http.get<Hero[]>(`${this.apiUrl}/heroes`);
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return this._http.get<Hero>(`${this.apiUrl}/heroes/${id}`)
      .pipe(
        catchError(error => of(undefined))
      );
  }

  getSuggestions(query: string): Observable<Hero[]> {
    return this._http.get<Hero[]>(`${this.apiUrl}/heroes?q=${query}&_limit=6`);
  }

}
