/**
 * Created by Jacek on 16-01-2017.
 */
import { Component } from '@angular/core';
import {GuserService} from "../gmain/guser.service";
import {Guser} from "../gmain/guser";
import { Router }            from '@angular/router';
import {Layout} from "../gadmin/layout";

@Component({
  moduleId: module.id,
  selector: 'scoreboard',
  templateUrl: 'scoreboard.component.html',
  //styleUrls: [ 'scoreboard.component.css' ]
})
export class ScoreboardComponent  {

  search: string;
  order = {
  column: "",
  asc: false,
};
  gusers: Guser[];
  selectedGuser: Guser;
  lvl: string;
  exp: string;
  ascDescSign = {'login':'˄', 'firstName':'˄', 'lastName':'˄', 'lvl':'˄', 'exp':'˄', 'description':'˄'};

  constructor(private guserService: GuserService, private router: Router) { }

  ngOnInit(): void {
    var temp = JSON.parse(localStorage.getItem('layout')) as Layout[];
    this.lvl = temp[1].value;
    this.exp = temp[0].value;
    this.guserService.getGusers()
      .then(gusers => this.gusers = gusers);
  }
  onSelect(user: Guser): void {
    this.selectedGuser = user;
    this.router.navigate(['/guser',{id: this.selectedGuser.id}]);
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
}
