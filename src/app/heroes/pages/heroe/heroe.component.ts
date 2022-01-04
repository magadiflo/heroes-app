import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap, tap } from 'rxjs';

import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService) { }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(res => console.log(res)); de esta manera se recibe el parámetro
    //pero como necesitamos llamar al servicio para consultar por el parámetro necesitamos hacer uso del switchMap
    //que devuelve un nuevo observable
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroePorId(id)),
        tap(heroe => console.log(heroe))
      )
      .subscribe(heroe => this.heroe = heroe);
  }

}
