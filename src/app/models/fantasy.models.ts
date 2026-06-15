export type PlayerPosition = 'GOLEIRO' | 'ZAGUEIRO' | 'LATERAL' | 'MEIA' | 'ATACANTE';

export type Formation = 'F_433' | 'F_442' | 'F_352' | 'F_343' | 'F_451' | 'F_541';

export type PositionFilter = PlayerPosition | 'TODOS';

export type MatchStatus = 'CONCLUIDA' | 'PENDENTE' | string;

export type MatchEventType = 'YELLOW_CARD' | 'RED_CARD' | 'GOAL' | 'ASSIST' | string;

export interface Owner {
  id?: number;
  username: string;
}

export interface NationalTeam {
  id?: number;
  name: string;
}

export interface Player {
  id: number;
  position: PlayerPosition;
  name: string;
  currentPrice: number;
  team?: NationalTeam | null;
}

export interface FantasyTeamDetails {
  id: number;
  name: string;
  cash: number;
  formation: Formation;
  owner?: Owner | null;
}

export interface SquadItem {
  id: number;
  player?: Player | null;
  roundPoints: number | null;
}

export interface SquadPlayerDTO {
  id: number;
  position: PlayerPosition;
  name: string;
  price: number;
  roundPoints: number;
  totalPoints: number;
}

export interface LeaderboardItem {
  teamName: string;
  cash: number;
  totalPoints: number;
}

export interface MatchEvent {
  minute: number;
  eventType: MatchEventType;
  player?: Player | null;
}

export interface Match {
  id: number;
  homeTeam?: NationalTeam | null;
  awayTeam?: NationalTeam | null;
  homeGoals?: number | null;
  awayGoals?: number | null;
  status: MatchStatus;
  events?: MatchEvent[] | null;
}
