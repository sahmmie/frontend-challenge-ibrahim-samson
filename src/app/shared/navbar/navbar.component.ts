import { Component, EventEmitter, Output } from '@angular/core';
import { UtilService } from '../../core/services/util/util.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  darkTheme = false;
  @Output() themeEv: EventEmitter<boolean> = new EventEmitter();
  constructor(private util: UtilService) {
    //
  }
  toggleTheme() {
    this.darkTheme = !this.darkTheme;
    this.themeEv.emit(this.darkTheme);
    // To set theme settings to available in app component via behavioursubject
    // this.util.setTheme(this.darkTheme);
  }
}
