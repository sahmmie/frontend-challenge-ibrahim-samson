import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { debounceTime, Observable, Subscription } from 'rxjs';
import { Country } from '../core/models/country';
import { Loader } from '../core/models/loader';
import { AppState } from '../core/models/state';
import { ApiService } from '../core/services/api/api.service';
import { UtilService } from '../core/services/util/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  countries: Country[] = [];
  visitedCountries: Country[] = [];
  loaderType: Loader = { type: 'list' };
  shodwDropdown = false;
  loading = false;
  currentPage = 1;
  selectedRegion: string;
  countryItems$: Observable<Country[]>;
  countrySub?: Subscription;
  searchControl: FormControl = new FormControl('');
  constructor(
    private countryS: ApiService,
    private router: Router,
    private util: UtilService,
    private store: Store<AppState>,
  ) {
    //
  }

  ngOnInit(): void {
    this.listenToKeySearch();
    this.countryItems$ = this.store.select((store) => store.countryList);
    this.countrySub = this.countryItems$.subscribe((countries) => {
      const visited = countries.filter((country) => {
        return country.visited === true;
      });
      this.visitedCountries = visited;
      countries.length > 0 ? (this.countries = countries) : this.getCountries();
    });
  }

  ngOnDestroy(): void {
    this.countrySub?.unsubscribe();
  }

  listenToKeySearch() {
    this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe(
      (data) => {
        this.countrySub = this.countryItems$.subscribe((countries) => {
          this.countries = countries.filter((country) => {
            return country.name
              .toLowerCase()
              .includes(data.toLowerCase());
          });
        });
      }
    );
  }

  getCountries() {
    this.loading = true;
    this.countryS.getCountries().subscribe((res) => {
      res.map((country) => {
        country.id = this.util.create_UUID();
      });
      const countries = _.orderBy(res, ['name'], ['asc']);
      this.util.dispatchTostore(countries, 'ADD_COUNTRY');
      this.loading = false;
    });
  }

  openDetail(country: Country) {
    this.util.dispatchTostore(country.id || '', 'ADD_VISITED_COUNTRY');
    this.router.navigate(['/', country.code]);
  }
}
