import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { switchMap, tap } from 'rxjs/operators';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `img {
      width: 100%;
      border-radius: 5px;
    }`
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  }

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    if(!this.router.url.includes('editar')) return;
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroePorId(id)),
        tap(console.log)
      )
      .subscribe(heroe => this.heroe = heroe);
  }

  guardar(): void {
    if(this.heroe.superhero.trim().length === 0) return;

    if(this.heroe.id){
      this.heroesService.actualizarHeroe(this.heroe)
        .subscribe(resp => this.mostrarSnackBar('Registro actualizado'));
    }else{
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe(resp => {
          this.mostrarSnackBar('Registro creado');
          this.router.navigate(['/heroes/editar', resp.id])
        });
    }
  }

  borrar(): void {
    this.dialog.open(ConfirmarComponent, {width: '250px'});
    // this.heroesService.borrarHeroe(this.heroe.id!)
    //   .subscribe(resp => {
    //     this.router.navigate(['/heroes']);
    //   });
  }

  mostrarSnackBar(mensaje: string): void {
    this.snackBar.open(mensaje, '¡Ok!', {
      duration: 3000
    });
  }
}
