import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private readonly http: HttpClient) {}

  /**
   * GET wrapper.
   *
   * @param endpoint - Full path.
   */
  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(endpoint, { params });
  }


  /**
   * POST wrapper.
   *
   * @param endpoint - Full path.
   */
  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(endpoint, body);
  }
}
