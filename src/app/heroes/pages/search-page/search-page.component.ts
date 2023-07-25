import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent implements OnInit {

  public searchInput = new FormControl();
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor(private _heroesService: HeroesService) { }

  ngOnInit(): void {

  }

  searchHero(): void {
    const value: string = this.searchInput.value || '';

    this._heroesService.getSuggestions(value)
      .subscribe(heroes => this.heroes = heroes);
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);

    this.selectedHero = hero;
    console.log(this.selectedHero);
  }

}
