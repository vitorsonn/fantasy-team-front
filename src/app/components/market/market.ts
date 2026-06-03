import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FantasyTeam } from '../../services/fantasy-team';


@Component({
  selector: 'app-market',
  standalone: false,
  templateUrl: './market.html',
  styleUrl: './market.css',
})
export class Market implements OnInit {

  public teams: any[] = [];
  public myTeam: any = null;
  public selectedPosition: string = 'TODOS';
  public selectedTeam: string = 'TODOS';
  public searchText: string = '';
  public itemsToShow: number = 20;
  public uniqueNationalTeams: string[] = [];
  public currentRoundId: number = 1;

  constructor(private fantasyService: FantasyTeam, private cdRef: ChangeDetectorRef) {}

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
      .filter(name => name != null);

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
      next: (response) => {
        alert('Rodada ' + roundId + ': Jogador comprado com sucesso!');
        this.loadMyTeamDetails();
      },
      error: (err) => {
        alert('Erro ao comprar: ' + (err.error?.message || 'Saldo insuficiente ou jogador já comprado'));
      }
    });
  }

  onSearchChange(event: any): void {
    this.searchText = event.target.value.toLowerCase();
    this.itemsToShow = 20;
  }

  loadMore(): void {
    this.itemsToShow += 12;
  }


  get filteredPlayers(): any[] {
    return this.teams.filter(player => {
      const matchPosition = this.selectedPosition === 'TODOS' || player.position === this.selectedPosition;
      const matchName = player.name.toLowerCase().includes(this.searchText);
      const matchTeam = this.selectedTeam === 'TODOS' || (player.team && player.team.name === this.selectedTeam);
      return matchPosition && matchName && matchTeam;
    });
  }


}
