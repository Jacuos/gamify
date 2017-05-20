/**
 * Created by Jacek on 23-01-2017.
 */
import {Component, Input} from '@angular/core';
import {GuserService} from "../gmain/guser.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Guser} from "../gmain/guser";
import {HomeComponent} from "../ghome/home.component";

@Component({
  moduleId: module.id,
  selector: 'go-quest',
  templateUrl: 'go-quest.component.html',
  //styleUrls: [ 'quest-log.component.css' ]
})
export class GoQuestComponent  {
  private sub: any;
  private qid: number = null;
  private guser: Guser;
  private response: string;

  constructor(private guserService: GuserService, private route: ActivatedRoute, private router: Router, private home: HomeComponent) {}

  ngOnInit(): void {
    this.guser = JSON.parse(localStorage.getItem('currentUser')) as Guser;
    this.sub = this.route
      .params
      .subscribe(params => {
        this.qid = params['qid'];
      });
    if(this.qid != null)
      this.sendRequest();
    /*this.guserService.getGuser(this.mode)
      .then(guser => this.guser = guser);

    this.guserService.getGuserQuests(this.mode)
      .then(gquest => this.gquest = gquest);*/
  }

  sendRequest(){
    if (this.qid>0){
      console.log('Leci!');
      this.guserService.addQuest(this.guser.id,this.qid)
        .then(response => this.response = response)
        .then(response => this.home.reload());
      this.qid=null;
    }
    this.router.navigate(['/goquest']);
  }

}
