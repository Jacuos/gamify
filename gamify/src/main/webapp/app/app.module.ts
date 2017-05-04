import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule }    from '@angular/http';

import {AppRoutingModule} from "./app-routing.module";

import { AppComponent }  from './app.component';
import { ScoreboardComponent }     from './scoreboard.component';
import {GuserDetailComponent} from "./guser-detail.component";
import { GuserService }         from './guser.service';
import {AuthService} from "./glogin/auth.service";
import {AuthGuard} from "./glogin/auth.guard";
import {LoginComponent} from "./glogin/login.component";
import {QuestLogComponent} from "./quest-log.component";
import {GoQuestComponent} from "./go-quest.component";

import {GuserSearchPipe} from "./guser-search.pipe";
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./glogin/register.component";
import {NotFoundComponent} from "./not-found.component";
import {PasswordValidator} from "./glogin/password.validator";
import {AdminLoginComponent} from "./gadmin/admin-login.component";
import {AdminDashboardComponent} from "./gadmin/admin-dashboard.component";
import {GadminComponent} from "./gadmin/gadmin.component";

import {AdminGuard} from "./gadmin/admin.guard";
import {AdminUsersComponent} from "./gadmin/admin-users.component";
import {AdminLayoutComponent} from "./gadmin/admin-layout.component";
import {GadminService} from "./gadmin/gadmin.service";
import { QRCodeModule } from 'angular2-qrcode';

import {AdminQuestsComponent} from "./gadmin/quests/admin-quests.component";
import {AdminAllQuestsComponent} from "./gadmin/quests/admin-allquests.component";
import {AdminNewQuestComponent} from "./gadmin/quests/admin-newquest.component";
import {SettingsComponent} from "./gsettings/settings.component";
import {SettingsService} from "./gsettings/settings.service";
import {GforgotComponent} from "./gforgot/gforgot.component";
import {GforgotService} from "./gforgot/gforgot.service";
import {GsetpassComponent} from "./gforgot/gsetpass.component";
import {AdminBadgesComponent} from "./gadmin/badges/admin-badges.component";
import {AdminEditBadgesComponent} from "./gadmin/badges/admin-edit-badges.component";
import {AdminGiveBadgesComponent} from "./gadmin/badges/admin-give-badges.component";


@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, HttpModule,JsonpModule, QRCodeModule],
  declarations: [ AppComponent, ScoreboardComponent, GuserDetailComponent, LoginComponent, QuestLogComponent,GoQuestComponent, GuserSearchPipe, LoginComponent, HomeComponent, RegisterComponent, NotFoundComponent, PasswordValidator,GadminComponent,  AdminLoginComponent, AdminDashboardComponent, AdminQuestsComponent, AdminUsersComponent, AdminLayoutComponent, AdminAllQuestsComponent, AdminNewQuestComponent, SettingsComponent, GforgotComponent, GsetpassComponent, AdminBadgesComponent, AdminEditBadgesComponent, AdminGiveBadgesComponent],
  providers: [GuserService, AuthService, AuthGuard, AdminGuard, GadminService, SettingsService, GforgotService],
  bootstrap:    [ AppComponent ]
})
export class AppModule {

}
