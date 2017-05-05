/**
 * Created by Jacek on 23-01-2017.
 */
import { Component } from '@angular/core';
import {Guser} from "./guser";
import {Gquest} from "./gquest";
import {GuserService} from "./guser.service";
import {Layout} from "./gadmin/layout";

@Component({
  moduleId: module.id,
  selector: 'quest-log',
  templateUrl: 'quest-log.component.html',
  //styleUrls: [ 'quest-log.component.css' ]
})
export class QuestLogComponent  {
  guser: Guser;
  gquests: Gquest[];
  exp: string;
  badges: string[];
  urls: string[] = new Array();

  constructor(private guserService: GuserService) { }

  ngOnInit(): void{
    var temp = JSON.parse(localStorage.getItem('layout')) as Layout[];
    this.exp = temp[0].value;
    this.guser = JSON.parse(localStorage.getItem('currentUser')) as Guser;
    this.guserService.getGuserQuests(this.guser.id.toString())
      .then(gquest => this.gquests = gquest);
    this.guserService.getBadges(this.guser.login)
      .then(response => {this.badges = response;this.urlify();});
  }
  urlify(){
    for(let badge of this.badges){
      this.urls.push("http://localhost:7000/api/badge?name="+badge);
    }
  }
}
