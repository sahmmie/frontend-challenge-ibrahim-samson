import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  Event as RouterEvent,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilService } from './core/services/util/util.service';
import { slider } from './_animations';
import * as AOS from 'aos';
import { AppState } from './core/models/state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slider],
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  public isShowingRouteLoadIndicator: boolean;
  public themeSub?: Subscription;
  darkTheme = false;
  title = '';
  loggedIn = false;
  constructor(
    private router: Router,
    private renderer: Renderer2,
    private appStore: Store<AppState>,
    private util: UtilService
  ) {
    this.isShowingRouteLoadIndicator = false;
    let asyncLoadCount = 0;
    router.events.subscribe((event: RouterEvent): void => {
      if (event instanceof RouteConfigLoadStart) {
        asyncLoadCount++;
      } else if (event instanceof RouteConfigLoadEnd) {
        asyncLoadCount--;
      }

      this.isShowingRouteLoadIndicator = !!asyncLoadCount;
    });
  }
  ngOnInit() {
    AOS.init();
    // To use if navbar is used npt globally used on the app component
    this.themeSub = this.util.theme.subscribe((theme) => {
      this.darkTheme = theme;
    });
    this.appStore.select(state => state.account).subscribe(account => {
      if (account?.email && account?.password) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.themeSub?.unsubscribe();
  }

  // To schroll right to top of the page on every page route
  onActivate() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  ngAfterViewInit() {
    const loader = this.renderer.selectRootElement('#appLoader');
    this.renderer.setStyle(loader, 'display', 'none');
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
