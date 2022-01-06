import { Pipe, PipeTransform } from '@angular/core';

import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  //pure: false, se volverá a ejecutar este pipe cada vez que el ciclo de detección de cambios de angular se dispare
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {
    console.log('Pipe imagen se procesó...');  
    return (!heroe.id && !heroe.alt_img) ? `assets/no-image.png` : heroe.alt_img ? heroe.alt_img : `assets/heroes/${heroe.id}.jpg`;
  }

}
