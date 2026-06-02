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

  constructor(private fantasyService: FantasyTeam, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadTeamData();
  }

  loadTeamData(): void {

    this.fantasyService.getMyTeamDetails(1).subscribe({
      next: (team) => {
        this.myTeam = team;
        this.cdRef.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar perfil do time', err)
    });

    this.fantasyService.getMySquad(1).subscribe({
      next: (players) => {
        this.squad = players;
        this.calculateTeamValue();
        this.cdRef.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar elenco', err)
    });
  }

  calculateTeamValue(): void {
    this.totalTeamValue = this.squad.reduce((sum, item) => {

      return sum + (item.player?.currentPrice || 0);
    }, 0);
  }
}



