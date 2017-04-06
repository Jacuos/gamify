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
import {RegisterComponent} from "./glogin/register.component";
import {NotFoundComponent} from "./not-found.component";
import {AdminLoginComponent} from "./gadmin/admin-login.component";
import {AdminDashboardComponent} from "./gadmin/admin-dashboard.component";
import {GadminComponent} from "./gadmin/gadmin.component";
import {AdminGuard} from "./gadmin/admin.guard";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'gadmin', redirectTo: '/gadmin/dashboard', pathMatch: 'full'},
  {path: 'gadmin', component: GadminComponent, children:
    [
      {path: 'login', component: AdminLoginComponent},
      {path: 'dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard]},
      {path: '**', redirectTo: 'gadmin/dashboard', pathMatch: 'full'},
    ]
  },
  {path: 'register', component: RegisterComponent},
  {path: 'scoreboard', component: ScoreboardComponent, canActivate: [AuthGuard]},
  {path: 'guser', component: GuserDetailComponent, canActivate: [AuthGuard]},
  {path: 'questlog', component: QuestLogComponent, canActivate: [AuthGuard]},
  {path: 'goquest', component: GoQuestComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/scoreboard', pathMatch: 'full', canActivate: [AuthGuard]},
  { path: '**', component: NotFoundComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
