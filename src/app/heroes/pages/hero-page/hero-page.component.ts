import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {

  public hero!: Hero;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _heroService: HeroesService,
    private _router: Router) { }

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        switchMap(({ id }) => this._heroService.getHeroById(id))
      )
      .subscribe(hero => {
        if(!hero) this._router.navigate(['/heroes', 'list']);
        this.hero = hero!;
      });
  }

}
