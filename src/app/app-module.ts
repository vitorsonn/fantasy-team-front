import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Market } from './components/market/market';
import { MyTeam } from './components/my-team/my-team';
import { Simulation } from './components/simulation/simulation';
import { RouterModule } from '@angular/router';
import {routes} from "./app-routing-module";
import { FormsModule } from '@angular/forms';
import { Leaderboard } from './components/leaderboard/leaderboard';

@NgModule({
  declarations: [
    App,
    Market,
    MyTeam,
    Simulation,
    Leaderboard
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
