import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule }    from '@angular/http';

import {AppRoutingModule} from "./app-routing.module";

import { AppComponent }  from './app.component';
import { ScoreboardComponent }     from './scoreboard.component';
import {GuserDetailComponent} from "./guser-detail.component";
import { GuserService }         from './guser.service';
import {LoginComponent} from "./login.component";
import {QuestLogComponent} from "./quest-log.component";
import {GoQuestComponent} from "./go-quest.component";


@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, HttpModule,JsonpModule ],
  declarations: [ AppComponent, ScoreboardComponent, GuserDetailComponent, LoginComponent, QuestLogComponent,GoQuestComponent ],
  providers: [GuserService],
  bootstrap:    [ AppComponent ]
})
export class AppModule {

}
