import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SimulationService } from '../../services/simulation-service';
@Component({
  selector: 'app-simulation',
  standalone: false,
  templateUrl: './simulation.html',
  styleUrl: './simulation.css',
})
export class Simulation implements OnInit {

public matches: any[] = [];
  public currentRoundId: number = 1;
  public totalRounds: number = 5;
  public isSimulating: boolean = false;
  public simulationFinished: boolean = false;



  constructor(
    private simulationService: SimulationService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadMatches();
  }

  loadMatches(): void {
  this.simulationService.getMatchesByRound(this.currentRoundId).subscribe({
    next: (data) => {
      this.matches = data;
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Erro ao carregar partidas:', err);
    }
  });
}


  nextRound(): void {
  if (this.currentRoundId < this.totalRounds) {
    this.currentRoundId++;
    this.loadMatches();
  }
}

previousRound(): void {
  if (this.currentRoundId > 1) {
    this.currentRoundId--;
    this.loadMatches();
  }
}


  triggerSimulation(): void {
    this.isSimulating = true;
    this.simulationFinished = false;

    this.simulationService.simulateRound(this.currentRoundId).subscribe({
      next: (response) => {
        this.isSimulating = false;
        this.simulationFinished = true;
        this.matches = [];
        this.cdr.detectChanges();

        this.loadMatches();

        setTimeout(() => {
          alert(response);
        }, 150);
      },
      error: (err) => {
        this.isSimulating = false;
        console.error(err);
        alert('Erro ao rodar simulação.');
      }
    });
  }


}
