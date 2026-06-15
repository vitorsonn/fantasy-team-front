import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from '../models/fantasy.models';

@Injectable({
  providedIn: 'root',
})
export class SimulationService {
  private apiUrl = 'http://localhost:8080/api/simulation';

  constructor(private http: HttpClient) { }

  getMatches(roundId: number): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiUrl}/results?roundId=${roundId}`);
  }

  simulateRound(roundId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/simulate-round?roundId=${roundId}`, {}, {
      responseType: 'text' as 'json'
    });
  }

  getMatchesByRound(roundId: number): Observable<Match[]> {
    return this.http.get<Match[]>(`${this.apiUrl}/matches/round/${roundId}`);
  }

}
