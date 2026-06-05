import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FantasyTeam } from '../../services/fantasy-team';

@Component({
  selector: 'app-leaderboard',
  standalone: false,
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.css'
})
export class Leaderboard implements OnInit {
  public rankingList: any[] = [];

  constructor(private fantasyService: FantasyTeam, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadLeaderboard();
  }

  loadLeaderboard(): void {
    this.fantasyService.getLeaderboard().subscribe({
      next: (data) => {
        this.rankingList = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar classificação', err)
    });
  }
}
