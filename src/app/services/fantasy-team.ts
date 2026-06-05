import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SquadPlayerDTO {
  id: number;
  position: string;
  name: string;
  price: number;
  roundPoints: number;
  totalPoints: number; // 🌟 O novo campo calculado pelo Java Stream
}

@Injectable({
  providedIn: 'root',
})
export class FantasyTeam {
  private apiUrl = 'http://localhost:8080/api/market';

  constructor(private http: HttpClient) {}

  getMarketTeams(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/players`);
  }

  getMyTeamDetails(teamId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/team/${teamId}`);
  }

  getMySquad(teamId: number, roundId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${teamId}/roster?roundId=${roundId}`);
  }

  buyPlayer(teamId: number, playerId: number, roundId: number): Observable<any> {
    const params = `?teamId=${teamId}&playerId=${playerId}&roundId=${roundId}`;
    return this.http.post<any>(`${this.apiUrl}/buy${params}`, {});
  }
  getLeaderboard(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/leaderboard`);
  }

  updateFormation(teamId: number, formation: string, roundId: number): Observable<any> {
  return this.http.put<any>(
    `${this.apiUrl}/teams/${teamId}/formation?formation=${formation}&roundId=${roundId}`,
    {}
  );
}
}
