import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivateFn } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { ConfirmDialogExitComponent } from '../components/confirm-dialog-exit/confirm-dialog-exit.component';

export type CanDeactivateType = Observable<boolean> | boolean;
export interface CanComponentDeactivate {
  canDeactivate: () => CanDeactivateType;
}

export const exitGuard: CanDeactivateFn<CanComponentDeactivate> = (component, currentRoute, currentState, nextState) => {
  const showDialog = component.canDeactivate();

  if (showDialog) {
    const dialog = inject(MatDialog);
    const dialogRef = dialog.open(ConfirmDialogExitComponent);
    return dialogRef.afterClosed()
      .pipe(
        tap(value => console.log('Respuesta presionada en el dialog: ' + value))
      );
  }

  return true;
};
