import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { ClickOutsideModule } from 'ng-click-outside';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptor } from './core/interceptors/JWTInterceptor';
import { CustomPipeModule } from './custom-pipe/custom-pipe.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import {
  addCountryReducer,
  countryHolidayReducer,
} from './store/reducers/country.reducer';
import { LoginComponent } from './login/login.component';
import { Account } from './core/models/account';
import { addAccountReducer } from './store/reducers/authentication.reducer';

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent],
  imports: [
  BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ClickOutsideModule,
    SharedModule,
    StoreModule.forRoot({
      countryList: addCountryReducer,
      countryHolidays: countryHolidayReducer,
      account:addAccountReducer
    }),
    NgxPaginationModule,
    CustomPipeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    Title,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
