import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Country, Holidays } from '../core/models/country';
import { Loader } from '../core/models/loader';
import { AppState } from '../core/models/state';
import { ApiService } from '../core/services/api/api.service';
import { UtilService } from '../core/services/util/util.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
})
export class CountryDetailsComponent implements OnInit {
  loading = false;
  holidays: Holidays[] = [];
  loaderType: Loader = { type: 'list' };
  country: any;
  constructor(
    private activateDroute: ActivatedRoute,
    private countryS: ApiService,
    private util: UtilService,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    const countrySlug = this.activateDroute.snapshot.paramMap.get('slug')!;

    this.store.select((store) => store.countryList).pipe(take(1)).subscribe((countries) => {
      this.country = countries.find((country) => country.code === countrySlug);
    });

  this.store.select((store) => store.countryHolidays).pipe(take(1)).subscribe((holidays) => {
    if (holidays.length > 0 && holidays.filter((holiday) => holiday.country_code === countrySlug).length > 0) {
      this.holidays = holidays.filter((holiday) => holiday.country_code.toLowerCase() === countrySlug.toLowerCase());
    } else {
      this.getCountryHoliday(countrySlug);
    }
  });
  }

  getCountryHoliday(name: string) {
    this.loading = true;
    this.countryS.getHolidaysByCountryCode(name).subscribe((res: Holidays[]) => {
      this.loading = false;
      this.holidays = res;
     this.store.dispatch({
        type: 'SET_COUNTRY_HOLIDAYS',
        payload: res,
     });
    });
  }
}
