import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SimulationService {
  private apiUrl = 'http://localhost:8080/api/simulation';

constructor(private http: HttpClient) { }

  getMatches(roundId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/results?roundId=${roundId}`);
  }

  simulateRound(roundId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/simulate-round?roundId=${roundId}`, {}, {
      responseType: 'text' as 'json'
    });
  }
}
