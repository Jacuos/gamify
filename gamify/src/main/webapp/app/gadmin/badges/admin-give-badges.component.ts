/**
 * Created by Jacek on 2017-05-04.
 */



import {Component} from '@angular/core';
import {GadminService} from "../gadmin.service";
import {Guser} from "../../gmain/guser";
import {GuserService} from "../../gmain/guser.service";
import {AuthService} from "../../glogin/auth.service";
import {Subscription} from "rxjs";


@Component({
  moduleId: module.id,
  selector: 'admin-give-badges',
  templateUrl: 'admin-give-badges.component.html',
  //styleUrls: [ 'app.component.css' ]
})

export class AdminGiveBadgesComponent  {
  badges: string[];
  urls = {};
  chosenOne: string;
  chosenOnes = {};
  response: string;

  search: string;
  order = {
    column: "",
    asc: false
  };
  gusers: Guser[];
  ascDescSign = {'login':'˄', 'firstName':'˄', 'lastName':'˄', 'lvl':'˄', 'exp':'˄', 'description':'˄'};
  token: string;
  subscription:Subscription = this.auth.token$
    .subscribe(token => this.token = token);
  constructor(private adminService: GadminService, private guserService: GuserService, private auth: AuthService){}

  ngOnInit(): void {
    this.adminService.getAllBadges()
      .then(response => {this.badges = response; this.urlify()});
    this.guserService.getGusers()
      .then(gusers => this.gusers = gusers);
  }

  urlify(){
      for(let badge of this.badges){
        this.urls[badge] = "https://localhost:7000/api/badge?token="+this.token+"&name="+badge;
      }
  }
  chooseBadge(event: any, chosenOne: string){
    this.chosenOne = chosenOne;
    console.log(chosenOne);
  }

  setOrder(value: string): void{
    if(value != this.order.column) {
      this.order.asc = true;
      this.ascDescSign[value] = '˄';
    }
    else {
      this.order.asc = !this.order.asc;
      if(this.ascDescSign[value] == '˅')
        this.ascDescSign[value] = '˄';
      else
        this.ascDescSign[value] = '˅';
    }
    this.order.column = value;
  }

  giveBadges(event: any){
    this.adminService.giveBadge(this.chosenOnes,this.chosenOne)
      .then(response => this.response = response);
  }
  checkUser(event: any, login: string){
    this.chosenOnes
    this.chosenOnes[login] = event.target.checked;
  }

}
