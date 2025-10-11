import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap, finalize } from 'rxjs';
import { BaseService } from 'src/app/core/base/base/base.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { loadList, loadListFailure, loadListSuccess } from '../base-liste/base-list-page.actions';
import { NotificationService } from 'src/app/core/services/notification.service';


@Injectable()
export class BaseListPageEffects {

  loadList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadList),
      tap(() => this.spinner.show()), 
      mergeMap(({ nomModele, params, status }) =>
        this.getService(nomModele, params, status).pipe(
          tap((response) => console.log(`Réponse API ${nomModele}`, response)),
          map((response: any) => this.normalizeResponse(nomModele, response)),
          catchError(error => {
            this.notif.error(error);
            return of(loadListFailure({ nomModele, error }));
          }),
          finalize(() => this.spinner.hide())
        )
      )
    )
  );
  
  private normalizeResponse(nomModele: string, response: any) {
  let data: any[] = [];
  let totalItems = 0;

  if (Array.isArray(response)) {
    // cas classique array brut
    data = response;
    totalItems = response.length;
  } else {
    // cas objet avec champs spécifiques
    if (nomModele === 'users' && response.users) {
      data = response.users;
      totalItems = response.totalItems || data.length;
    } else {
      data = response.data || [];
      totalItems = response.totalItems || data.length;
    }
  }

  return loadListSuccess({ nomModele, data, totalItems });
}

  private getService(nomModele: string, params: any, status: number) {
    switch (nomModele) {
      
      case 'collaborateur':
        return this.baseService.list(nomModele, params);

      default:  
        return this.baseService.list(nomModele, params);
    }
  }

  constructor(
    private actions$: Actions,
    private baseService: BaseService,
    private spinner: NgxSpinnerService,
    private notif : NotificationService
  ) {}
}
