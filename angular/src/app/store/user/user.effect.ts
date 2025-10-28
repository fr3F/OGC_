import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { User } from './user.model';
import { fetchlistUser, fetchlistUserFail, fetchListUserSuccess } from './user.action';

interface UserResponse {
  users: User[];
  totalItems: number;
}

@Injectable()
export class UserEffects {
  fetchUserList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchlistUser),
      mergeMap(({ search, page, size }) =>
        this.userService.getAll({ search, page, size }).pipe(
          map((response: UserResponse) =>
            fetchListUserSuccess({
              userlist: response.users,
              totalItems: response.totalItems
            })
          ),
          catchError((error) =>
            of(fetchlistUserFail({ error: error.message || 'Erreur inconnue' }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
