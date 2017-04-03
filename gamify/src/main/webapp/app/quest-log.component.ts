/**
 * Created by Jacek on 23-01-2017.
 */
import { Component } from '@angular/core';
import {Guser} from "./guser";
import {Gquest} from "./gquest";
import {GuserService} from "./guser.service";

@Component({
  moduleId: module.id,
  selector: 'quest-log',
  templateUrl: 'quest-log.component.html',
  //styleUrls: [ 'quest-log.component.css' ]
})
export class QuestLogComponent  {
  guser: Guser;
  gquests: Gquest[];

  constructor(private guserService: GuserService) { }

  ngOnInit(): void{
    this.guser = JSON.parse(localStorage.getItem('currentUser')) as Guser;
    this.guserService.getGuserQuests(this.guser.id.toString())
      .then(gquest => this.gquests = gquest);
  }
}
