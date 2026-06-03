import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FantasyTeam } from '../../services/fantasy-team';

@Component({
  selector: 'app-my-team',
  standalone: false,
  templateUrl: './my-team.html',
  styleUrl: './my-team.css',
})
export class MyTeam implements OnInit {

  public myTeam: any = null;
  public squad: any[] = [];
  public totalTeamValue: number = 0;

  // 🌟 NAVEGAÇÃO DE RODADAS NO ELENCO
  public currentRoundId: number = 1;
  public totalRounds: number = 5;

  constructor(private fantasyService: FantasyTeam, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadTeamData();
  }

  loadTeamData(): void {
    // 1. Carrega os dados gerais do time (Nome, Patrimônio, Saldo Restante)
    this.fantasyService.getMyTeamDetails(1).subscribe({
      next: (team) => {
        this.myTeam = team;
        this.cdRef.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar perfil do time', err)
    });

    // 2. Carrega o elenco passando dinamicamente a rodada selecionada
    this.loadSquadByRound();
  }

  loadSquadByRound(): void {
    // Passa o ID do time (1) e a rodada atual para o backend filtrado
    this.fantasyService.getMySquad(1, this.currentRoundId).subscribe({
      next: (players) => {
        this.squad = players;
        this.calculateTeamValue();
        this.cdRef.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar elenco da rodada ' + this.currentRoundId, err)
    });
  }

  previousRound(): void {
    if (this.currentRoundId > 1) {
      this.currentRoundId--;
      this.loadSquadByRound();
    }
  }

  nextRound(): void {
    if (this.currentRoundId < this.totalRounds) {
      this.currentRoundId++;
      this.loadSquadByRound();
    }
  }

  calculateTeamValue(): void {
    this.totalTeamValue = this.squad.reduce((sum, item) => {
      return sum + (item.player?.currentPrice || 0);
    }, 0);
  }
}
