import { Pipe, PipeTransform } from '@angular/core';

import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {
    return (!heroe.id && !heroe.alt_img) ? `assets/no-image.png` : heroe.alt_img ? heroe.alt_img : `assets/heroes/${heroe.id}.jpg`;
  }

}
