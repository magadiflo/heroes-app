import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

}
