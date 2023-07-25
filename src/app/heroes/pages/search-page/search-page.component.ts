import { Component, OnInit } from '@angular/core';

import { HeroesService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent implements OnInit {

  public searchInput = new FormControl();

  constructor(private _heroesService: HeroesService) { }

  ngOnInit(): void {

  }

}
