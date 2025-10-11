import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { login, loginSuccess, loginFailure, logout, logoutSuccess } from './authentication.actions';
import { Router } from '@angular/router';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';

@Injectable()
export class AuthenticationEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthfakeauthenticationService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(() => {
        return this.authService.login().pipe(
          map(user => loginSuccess({ user })),
          catchError(error => of(loginFailure({ error: error.message || 'Erreur de login' })))
        );
      })
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      tap(({ user }) => {
        localStorage.setItem('token', user.token);
        this.router.navigate(['/collaborateur']);
      })
    ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      tap(() => {
        this.authService.logout();
      }),
      map(() => logoutSuccess())
    )
  );
}
