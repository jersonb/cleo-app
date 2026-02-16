import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  http = inject(HttpClient);

  createRequest(requestCreate: FormData): Observable<HttpResponse<Object>> {
    return this.http.post<HttpResponse<Object>>(`${environment.apiUrl}/certificates`, requestCreate,
      {
        observe: 'response',
      });
  }

  downloadFile(url: string): Observable<HttpResponse<Blob>> {
    return this.http.get(url,
      {
        responseType: 'blob',
        observe: 'response'
      });
  }
}
