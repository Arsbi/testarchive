import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CalendarService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getCalendarData(dPresent: string, dPrevious: string, dNext: string, mPresent: string, mPrevious: string, mNext: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const requestBody = {
      dPresent: dPresent,
      dPrevious: dPrevious,
      dNext: dNext,
      mPresent: mPresent,
      mPrevious: mPrevious,
      mNext: mNext,
    };

    return this.http.post<any>(`${this.apiUrl}/calendar/all`, requestBody, { headers: headers });
  }
  getContentData(): Observable<any> {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    // });

    
    return this.http.get<any>(`${this.apiUrl}/content/all`);
  }
  
}




