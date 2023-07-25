import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent {

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

  constructor(private _heroesService: HeroesService) { }

  public publishers = [
    { id: 'DC Comics', description: 'DC - Comics' },
    { id: 'Marvel Comics', description: 'Marvel - Comics' }
  ];

  onSubmit(): void {
    if (this.heroForm.invalid) return;
    console.log({ formIsValid: this.heroForm.valid, value: this.heroForm.value });

    this._heroesService.addHero(this.currentHero)
      .subscribe(heroDB => console.log(heroDB));
  }

}
