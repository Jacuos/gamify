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
import {AdminQuestsComponent} from "./gadmin/quests/admin-quests.component";
import {AdminUsersComponent} from "./gadmin/admin-users.component";
import {AdminLayoutComponent} from "./gadmin/admin-layout.component";
import {AdminAllQuestsComponent} from "./gadmin/quests/admin-allquests.component";
import {AdminNewQuestComponent} from "./gadmin/quests/admin-newquest.component";
import {SettingsComponent} from "./gsettings/settings.component";
import {GforgotComponent} from "./gforgot/gforgot.component";
import {GsetpassComponent} from "./gforgot/gsetpass.component";
import {AdminBadgesComponent} from "./gadmin/badges/admin-badges.component";
import {AdminEditBadgesComponent} from "./gadmin/badges/admin-edit-badges.component";
import {AdminGiveBadgesComponent} from "./gadmin/badges/admin-give-badges.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'gadmin', redirectTo: '/gadmin/dashboard', pathMatch: 'full'},
  {path: 'gadmin', component: GadminComponent, children:
    [
      {path: 'login', component: AdminLoginComponent},
      {path: 'dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard], children:
        [
          {path: 'quests',  component: AdminQuestsComponent,  children: [{path: 'new', component: AdminNewQuestComponent},{path: 'all', component: AdminAllQuestsComponent}] },
          {path: 'badges',  component: AdminBadgesComponent,  children: [{path: 'edit', component: AdminEditBadgesComponent},{path: 'give', component: AdminGiveBadgesComponent}] },
          {path: 'users', component: AdminUsersComponent},
          {path: 'layout', component: AdminLayoutComponent},
        ]
      },
      {path: '**', redirectTo: 'gadmin/dashboard', pathMatch: 'full'},
    ]
  },
  {path: 'register', component: RegisterComponent},
  {path: 'forgot', component: GforgotComponent},
  {path: 'setpass', component: GsetpassComponent},
  {path: 'scoreboard', component: ScoreboardComponent, canActivate: [AuthGuard]},
  {path: 'guser', component: GuserDetailComponent, canActivate: [AuthGuard]},
  {path: 'questlog', component: QuestLogComponent, canActivate: [AuthGuard]},
  {path: 'goquest', component: GoQuestComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/scoreboard', pathMatch: 'full', canActivate: [AuthGuard]},
  { path: '**', component: NotFoundComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
