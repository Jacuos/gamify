/**
 * Created by Jacek on 18-01-2017.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScoreboardComponent }     from './scoreboard.component';
import {GuserDetailComponent} from "./guser-detail.component";
import {LoginComponent} from "./login.component";
import {QuestLogComponent} from "./quest-log.component";
import {GoQuestComponent} from "./go-quest.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'scoreboard', component: ScoreboardComponent},
  {path: 'guser/:id', component: GuserDetailComponent},
  {path: 'questlog', component: QuestLogComponent},
  {path: 'goquest', component: GoQuestComponent},
  {path: '', redirectTo: '/scoreboard', pathMatch: 'full'}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
