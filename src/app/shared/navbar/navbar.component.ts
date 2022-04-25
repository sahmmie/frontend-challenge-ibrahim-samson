import { Component, EventEmitter, Output } from '@angular/core';
import { UtilService } from '../../core/services/util/util.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  darkTheme = false;
  @Output() themeEv: EventEmitter<boolean> = new EventEmitter();
  constructor(private util: UtilService, private appStore: Store, private router: Router) { }
  toggleTheme() {
    this.darkTheme = !this.darkTheme;
    this.themeEv.emit(this.darkTheme);
    // To set theme settings to available in app component via behavioursubject
    // this.util.setTheme(this.darkTheme);
  }

  logout() {
    this.appStore.dispatch({
      type: 'REMOVE_ACCOUNT',
      payload: null
    });
    this.router.navigate(['/']);
  }
}
