import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BaseDeletePageActions from './base-delete-page.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { BaseService } from 'src/app/core/base/base/base.service';
import { AutoriseZeroService } from 'src/app/features/parametrage/autorize-zero-page/service/autorise-zero.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Injectable()
export class BaseDeletePageEffects {

  constructor(
    private actions$: Actions,
    private baseService: BaseService,
    private autoriseZeroService: AutoriseZeroService,
    private notif: NotificationService
  ) {}

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BaseDeletePageActions.loadDelete),
      mergeMap(({ nomModele, id }) =>
        this.baseService.delete( nomModele, id  ).pipe(
          map(() => BaseDeletePageActions.loadDeleteSuccess({nomModele, id})),
          tap(() => this.notif.info("Supprimé")),
          tap(() => this.autoriseZeroService.triggerReloadChildData() ),            
          catchError((error) => {
              this.notif.error(error)
              return of(BaseDeletePageActions.loadDeleteFailure({ error }))
            }
          )
        )
      )
    )
  );

}