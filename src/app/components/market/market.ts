import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FantasyTeam } from '../../services/fantasy-team';
import { FantasyTeamDetails, Player, PositionFilter } from '../../models/fantasy.models';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-market',
  standalone: false,
  templateUrl: './market.html',
  styleUrl: './market.css',
})
export class Market implements OnInit {

  public teams: Player[] = [];
  public myTeam: FantasyTeamDetails | null = null;
  public selectedPosition: PositionFilter = 'TODOS';
  public selectedTeam: string = 'TODOS';
  public searchText: string = '';
  public itemsToShow: number = 20;
  public uniqueNationalTeams: string[] = [];
  public currentRoundId: number = 1;

  constructor(
    private fantasyService: FantasyTeam,
    private cdRef: ChangeDetectorRef,
    private notifications: NotificationService,
  ) {}

  ngOnInit(): void {
    this.loadMarketData();
    this.loadMyTeamDetails();
  }

  loadMarketData(): void {
    this.fantasyService.getMarketTeams().subscribe({
      next: (data) => {
        this.teams = data;
        this.extractUniqueTeams();
        this.cdRef.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar mercado', err)
    });
  }

  extractUniqueTeams(): void {
    const teamNames = this.teams
      .map(player => player.team?.name)
      .filter((name): name is string => name != null);

    this.uniqueNationalTeams = Array.from(new Set(teamNames)).sort();
  }

  loadMyTeamDetails(): void {
    this.fantasyService.getMyTeamDetails(1).subscribe({
      next: (data) => {
        this.myTeam = data;
        this.cdRef.detectChanges();

      },
      error: (err) => console.error('Erro ao carregar dados do seu time', err)
    });
  }

  nextRound(): void {
  if (this.currentRoundId < 5) {
    this.currentRoundId++;
  }
}

previousRound(): void {
  if (this.currentRoundId > 1) {
    this.currentRoundId--;
  }
}

  buyPlayer(playerId: number): void {
    const roundId = this.currentRoundId;
    const teamId = 1;
    this.fantasyService.buyPlayer(teamId, playerId, roundId).subscribe({
      next: () => {
        this.notifications.success(`Rodada ${roundId}: jogador comprado com sucesso!`);
        this.loadMyTeamDetails();
      },
      error: (err: HttpErrorResponse) => {
        const message = err.error?.message || 'Saldo insuficiente ou jogador ja comprado';
        this.notifications.error(message, 'Erro ao comprar');
      }
    });
  }

  onSearchChange(event: Event): void {
    this.searchText = (event.target as HTMLInputElement).value.toLowerCase();
    this.itemsToShow = 20;
  }

  loadMore(): void {
    this.itemsToShow += 12;
  }


  get filteredPlayers(): Player[] {
    return this.teams.filter(player => {
      const matchPosition = this.selectedPosition === 'TODOS' || player.position === this.selectedPosition;
      const matchName = player.name.toLowerCase().includes(this.searchText);
      const matchTeam = this.selectedTeam === 'TODOS' || (player.team && player.team.name === this.selectedTeam);
      return matchPosition && matchName && matchTeam;
    });
  }


}
