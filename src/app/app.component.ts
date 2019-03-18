import {Component, OnInit} from '@angular/core';
import {select, State, Store} from '@ngrx/store';
import {AppState} from './reducers';
import {Logout} from './auth/auth.actions';
import {Observable} from 'rxjs';
import {isLoggedIn, isLoggedOut} from './auth/auth.selectors';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isLoggedIn$: Observable<boolean>;
  public isLoggedOut$: Observable<boolean>;

  constructor(
    private store: Store<AppState>
  ) {

  }

  ngOnInit() {
    this.getIsUserLoggedInFlag();
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  private getIsUserLoggedInFlag() {
   this.isLoggedIn$ = this.store
      .pipe(
        select(isLoggedIn)
      );
    this.isLoggedOut$ = this.store
      .pipe(
        select(isLoggedOut)
      );
  }
}
