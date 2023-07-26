import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

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

  addHero(hero: Hero): Observable<Hero> {
    return this._http.post<Hero>(`${this.apiUrl}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) throw Error('Id del Hero es requerido');
    return this._http.patch<Hero>(`${this.apiUrl}/heroes/${hero.id}`, hero);
  }

  deleteHeroById(id: string): Observable<boolean> {
    return this._http.delete<{}>(`${this.apiUrl}/heroes/${id}`)
      .pipe(
        map(resp => true),
        catchError(err => of(false)),
      )
  }

}
