import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Country } from '../../models/country';
import { AppState } from '../../models/state';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private store: Store<AppState>) {
    //
  }

  private themeSubject = new BehaviorSubject<boolean>(false);
  theme = this.themeSubject.asObservable();

  setTheme(theme: boolean) {
    this.themeSubject.next(theme);
  }

  create_UUID() {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
      },
    );
    return uuid;
  }

  dispatchTostore(data: Country[] | string, type: string) {
    this.store.dispatch({
      type,
      payload: data,
    });
  }
}
