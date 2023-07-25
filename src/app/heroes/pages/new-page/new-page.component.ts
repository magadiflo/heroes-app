import { Component } from '@angular/core';

import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent {

  public hero: Hero = <Hero>{};

  public publishers = [
    { id: 'DC Comics', description: 'DC - Comics'},
    { id: 'Marvel Comics', description: 'Marvel - Comics'}
  ];

}
