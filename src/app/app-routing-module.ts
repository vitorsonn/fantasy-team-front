import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Market } from './components/market/market';
import { MyTeam } from './components/my-team/my-team';
import { Simulation } from './components/simulation/simulation';
export const routes: Routes = [
  { path: 'market', component: Market },
  { path: 'my-team', component: MyTeam },
  { path: 'simulation', component: Simulation },
  { path: '', redirectTo: '/market', pathMatch: 'full' },
  { path: '**', redirectTo: '/market' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
