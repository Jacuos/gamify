/**
 * Created by Jacek on 2017-05-04.
 */



import {Component} from '@angular/core';
import {GadminService} from "../gadmin.service";
import {Guser} from "../../guser";
import {GuserService} from "../../guser.service";


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

  constructor(private adminService: GadminService, private guserService: GuserService){}

  ngOnInit(): void {
    this.adminService.getAllBadges()
      .then(response => {this.badges = response; this.urlify()});
    this.guserService.getGusers()
      .then(gusers => this.gusers = gusers);
  }

  urlify(){
      for(let badge of this.badges){
        this.urls[badge] = "http://localhost:7000/api/badge?name="+badge;
      }
  }
  chooseBadge(event: any, chosenOne: string){
    this.chosenOne = chosenOne;
    console.log(chosenOne);
  }

  setOrder(value: string): void{
    if(value != this.order.column)
      this.order.asc = true;
    else
      this.order.asc = !this.order.asc;
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
