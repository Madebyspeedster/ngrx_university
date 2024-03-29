import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthActionTypes, Login, Logout} from './auth.actions';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {defer, Observable, of} from 'rxjs';


@Injectable()
export class AuthEffects {

  @Effect({dispatch: false})
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action => {
      if (!localStorage.getItem('user')) {
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      }
    })
  );

  @Effect({dispatch: false})
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap(() => {
      localStorage.removeItem('user');
      return this.router.navigateByUrl('/');
    })
  );

  @Effect()
  $init = defer((): Observable<Login | Logout> => {
    const userData = localStorage.getItem('user');
    if (userData) {
      console.log(JSON.parse(userData));
      return of(new Login(JSON.parse(userData)));
    } else {
      return of(new Logout());
    }
  });

  constructor(
    private actions$: Actions,
    private router: Router
  ) {
  }
}

