import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  http = inject(HttpClient);

  createRequest(requestCreate: FormData): Observable<HttpResponse<Object>> {
    return this.http.post<HttpResponse<Object>>('http://localhost:5092/', requestCreate, { observe: 'response' });
  }
}
