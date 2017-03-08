/**
 * Created by Jacek on 18-01-2017.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScoreboardComponent }     from './scoreboard.component';
import {GuserDetailComponent} from "./guser-detail.component";
import {LoginComponent} from "./glogin/login.component";
import {QuestLogComponent} from "./quest-log.component";
import {GoQuestComponent} from "./go-quest.component";
import {AuthGuard} from "./glogin/auth.guard";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'scoreboard', component: ScoreboardComponent, canActivate: [AuthGuard]},
  {path: 'guser/:id', component: GuserDetailComponent, canActivate: [AuthGuard]},
  {path: 'questlog', component: QuestLogComponent, canActivate: [AuthGuard]},
  {path: 'goquest', component: GoQuestComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/scoreboard', pathMatch: 'full', canActivate: [AuthGuard] }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
