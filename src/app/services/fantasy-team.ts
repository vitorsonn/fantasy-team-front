import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  FantasyTeamDetails,
  Formation,
  LeaderboardItem,
  Player,
  SquadItem,
} from '../models/fantasy.models';

@Injectable({
  providedIn: 'root',
})
export class FantasyTeam {
  private apiUrl = 'http://localhost:8080/api/market';

  constructor(private http: HttpClient) {}

  getMarketTeams(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/players`);
  }

  getMyTeamDetails(teamId: number): Observable<FantasyTeamDetails> {
    return this.http.get<FantasyTeamDetails>(`${this.apiUrl}/team/${teamId}`);
  }

  getMySquad(teamId: number, roundId: number): Observable<SquadItem[]> {
    return this.http.get<SquadItem[]>(`${this.apiUrl}/${teamId}/roster?roundId=${roundId}`);
  }

  buyPlayer(teamId: number, playerId: number, roundId: number): Observable<unknown> {
    const params = `?teamId=${teamId}&playerId=${playerId}&roundId=${roundId}`;
    return this.http.post<unknown>(`${this.apiUrl}/buy${params}`, {});
  }
  getLeaderboard(): Observable<LeaderboardItem[]> {
    return this.http.get<LeaderboardItem[]>(`${this.apiUrl}/leaderboard`);
  }

  updateFormation(
    teamId: number,
    formation: Formation,
    roundId: number,
  ): Observable<FantasyTeamDetails> {
    return this.http.put<FantasyTeamDetails>(
      `${this.apiUrl}/teams/${teamId}/formation?formation=${formation}&roundId=${roundId}`,
      {},
    );
  }
}
