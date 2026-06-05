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

  public currentRoundId: number = 1;
  public totalRounds: number = 5;

  public goalkeepers: any[] = [];
  public defenders: any[] = [];
  public midfielders: any[] = [];
  public attackers: any[] = [];

  public availableFormations = ['F_433', 'F_442', 'F_352', 'F_343', 'F_451', 'F_541'];


  constructor(
    private fantasyService: FantasyTeam,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadTeamData();
  }

loadTeamData(): void {
  this.fantasyService.getMyTeamDetails(1).subscribe({
    next: (team) => {
      this.myTeam = team;
      this.cdRef.detectChanges();
    },
    error: (err) => console.error('Erro ao carregar perfil do time', err),
  });

  this.loadSquadByRound();
}

loadSquadByRound(): void {
  this.fantasyService.getMySquad(1, this.currentRoundId).subscribe({
    next: (players) => {
      this.squad = players;
      this.calculateTeamValue();


      this.goalkeepers = players.filter(item => item.player?.position === 'GOLEIRO');
      this.defenders = players.filter(item => item.player?.position === 'ZAGUEIRO' || item.player?.position === 'LATERAL');
      this.midfielders = players.filter(item => item.player?.position === 'MEIA');
      this.attackers = players.filter(item => item.player?.position === 'ATACANTE');

      this.cdRef.detectChanges();
    },
    error: (err) =>
      console.error('Erro ao carregar elenco da rodada ' + this.currentRoundId, err),
  });
}

onFormationChange(event: any): void {
  const selectedFormation = event.target.value;
  const teamId = 1;

  this.fantasyService.updateFormation(teamId, selectedFormation, this.currentRoundId).subscribe({
    next: (updatedTeam) => {
      this.myTeam.formation = updatedTeam.formation;


      this.loadSquadByRound();

      alert(`Formação alterada para ${this.getFormationLabel(updatedTeam.formation)} com sucesso!`);
    },
    error: (err) => {
      alert(err.error || "Não foi possível alterar a formação.");

      event.target.value = this.myTeam.formation;
    }
  });
}

getFormationLabel(formationEnum: string): string {
  switch (formationEnum) {
    case 'F_433': return '4-3-3';
    case 'F_442': return '4-4-2';
    case 'F_352': return '3-5-2';
    case 'F_343': return '3-4-3';
    case 'F_451': return '4-5-1';
    case 'F_541': return '5-4-1';
    default: return formationEnum;
  }
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
