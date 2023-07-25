import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  public heroForm: FormGroup = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>(''),
  });

  public get currentHero(): Hero {
    return this.heroForm.value as Hero;
  }

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _heroesService: HeroesService) { }

  ngOnInit(): void {
    if (!this._router.url.includes('edit')) return;
    this._activatedRoute.params
      .pipe(
        switchMap(({ id }) => this._heroesService.getHeroById(id))
      )
      .subscribe(hero => {
        if (!hero) this._router.navigate(['/heroes', 'list']);
        this.heroForm.reset(hero);
      });
  }

  public publishers = [
    { id: 'DC Comics', description: 'DC - Comics' },
    { id: 'Marvel Comics', description: 'Marvel - Comics' }
  ];

  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this._updateHero();
    } else {
      this._saveHero();
    }
  }

  private _saveHero() {
    this._heroesService.addHero(this.currentHero)
      .subscribe(heroDB => {
        // TODO: mostrar snackbar
      });
  }

  private _updateHero() {
    this._heroesService.updateHero(this.currentHero)
      .subscribe(heroDB => {
        // TODO: mostrar snackbar y navegar a /heroes/edit/ hero.id
      });
  }

}
