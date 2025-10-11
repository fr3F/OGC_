import { catchError, map, mergeMap, of } from 'rxjs';
import { loadMenus, loadMenusSuccess, loadMenusFailure } from './menu.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { MenuService } from 'src/app/core/services/menu.service';
import { MenuItem } from './menu.model';

@Injectable()
export class MenuEffects {

  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMenus),
      mergeMap(() =>
        this.menuservice.getMenu().pipe(
          map((Menus: MenuItem[]) => loadMenusSuccess({ Menus })),
          catchError(error => of(loadMenusFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private menuservice: MenuService
  ) {}
}
