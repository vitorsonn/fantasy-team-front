import { Component, OnInit } from '@angular/core';
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
  public searchText: string = '';
  public itemsToShow: number = 20

  constructor(private fantasyService: FantasyTeam) {}

  ngOnInit(): void {
    this.loadMarketData();
    this.loadMyTeamDetails();
  }

  loadMarketData(): void {
    this.fantasyService.getMarketTeams().subscribe({
      next: (data) => {
        this.teams = data;
      },
      error: (err) => console.error('Erro ao carregar mercado', err)
    });
  }

  loadMyTeamDetails(): void {
    this.fantasyService.getMyTeamDetails(1).subscribe({
      next: (data) => {
        this.myTeam = data;
      },
      error: (err) => console.error('Erro ao carregar dados do seu time', err)
    });
  }

  buyPlayer(playerId: number): void {
    const roundId = 1;
    this.fantasyService.buyPlayer(1, playerId, roundId).subscribe({
      next: (response) => {
        alert('Jogador comprado com sucesso!');
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
      return matchPosition && matchName;
    });
  }


}
