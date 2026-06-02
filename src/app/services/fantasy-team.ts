import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FantasyTeam {

  private apiUrl = 'http://localhost:8080/api/market'; // 🌟 Aponta direto para a raiz do seu MarketController

  constructor(private http: HttpClient) { }

  getMarketTeams(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/players`);
  }

  getMyTeamDetails(teamId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/team/${teamId}`);
  }

  getMySquad(teamId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${teamId}/roster`);
  }

  buyPlayer(teamId: number, playerId: number, roundId: number): Observable<any> {
    const params = `?teamId=${teamId}&playerId=${playerId}&roundId=${roundId}`;
    return this.http.post<any>(`${this.apiUrl}/buy${params}`, {});
  }
}
