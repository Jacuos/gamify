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


@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, HttpModule,JsonpModule ],
  declarations: [ AppComponent, ScoreboardComponent, GuserDetailComponent, LoginComponent, QuestLogComponent,GoQuestComponent, GuserSearchPipe, LoginComponent, HomeComponent ],
  providers: [GuserService, AuthService, AuthGuard],
  bootstrap:    [ AppComponent ]
})
export class AppModule {

}
