import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { CanComponentDeactivate, CanDeactivateType } from '../../guards/exit.guard';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit, CanComponentDeactivate {

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
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
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

  @HostListener('window:beforeunload', ['$event'])
  public onBeforeReload(event: BeforeUnloadEvent) {
    if (this._showDialog()) {
      event.preventDefault();
    }
    return;
  }

  canDeactivate(): CanDeactivateType {
    return this._showDialog();
  }

  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this._updateHero();
    } else {
      this._saveHero();
    }
  }

  private _showDialog(): boolean {
    const keys = Object.keys(this.heroForm.controls).filter(key => key !== 'publisher' && key !== 'id');
    const values = keys.map(key => this.heroForm.get(key)?.value);
    const showDialog = values.some(value => value !== '');
    return showDialog;
  }

  private _saveHero() {
    this._heroesService.addHero(this.currentHero)
      .subscribe(heroDB => {
        this._showSnackBar(`${heroDB.superhero} guardado!`);
        this._router.navigate(['/heroes', 'edit', heroDB.id]);
      });
  }

  private _updateHero() {
    this._heroesService.updateHero(this.currentHero)
      .subscribe(heroDB => {
        this._showSnackBar(`${heroDB.superhero} actualizado!`);
      });
  }

  onConfirmDeleteHero() {
    if (!this.currentHero.id) throw Error('El id del Hero es requerido'); //* Solo por siacaso
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: this.currentHero,
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result), // Solo filtrará si la condición es verdadera, eso significa solo pasará si da click en OK borrar.
        switchMap((result: boolean) => this._heroesService.deleteHeroById(this.currentHero.id)),
        filter((wasDeleted: boolean) => wasDeleted)
      )
      .subscribe(res => {
        this._showSnackBar(`${this.currentHero.superhero} eliminado!`);
        this._router.navigate(['/heroes', 'list']);
      });
  }

  private _showSnackBar(message: string): void {
    this._snackBar.open(message, 'cerrar', {
      duration: 2500,
    })
  }

}
