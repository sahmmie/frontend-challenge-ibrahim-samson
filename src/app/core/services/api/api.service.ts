import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../../models/country';
import { RequestService } from '../request/request.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = environment.url;
  baseApiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private reqS: RequestService) {}

  public getCountries(): Observable<Country[]> {
    return this.reqS.get(this.baseApiUrl + 'Countries').pipe(
      map((data: any) => {
        return data.countries;
      }));
  }

  getHolidaysByCountryCode(code: string, year = 2022): Observable<any> {
    return this.reqS.post(this.baseApiUrl + 'List', {
      country_code: code,
      year: year,
    }).pipe(
      map((data: any) => {
        return data.holidays;
      }));
  }

  public getCountryByFullname(name: string): Observable<Country[]> {
    const params = new HttpParams({
      fromObject: {
        fullText: true,
      },
    });
    return this.reqS.get(this.baseUrl + 'name/' + name, params);
  }

  public getCountryByRegion(region: string): Observable<Country[]> {
    return this.reqS.get(this.baseUrl + 'region/' + region);
  }
  public getCountryByCode(code: string): Observable<Country[]> {
    return this.reqS.get(this.baseUrl + 'alpha/' + code);
  }

  public getCountryByCodes(code: string): Observable<Country[]> {
    const params = new HttpParams({
      fromObject: {
        codes: code,
      },
    });
    return this.reqS.get(this.baseUrl + 'alpha', params);
  }

}
