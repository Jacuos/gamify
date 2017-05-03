/**
 * Created by Jacek on 16-01-2017.
 */
import { Component } from '@angular/core';
import {GuserService} from "./guser.service";
import {Guser} from "./guser";
import { Router }            from '@angular/router';
import {Layout} from "./gadmin/layout";

@Component({
  moduleId: module.id,
  selector: 'scoreboard',
  templateUrl: 'scoreboard.component.html',
  styleUrls: [ 'scoreboard.component.css' ]
})
export class ScoreboardComponent  {

  search: string;
  order = {
  column: "",
  asc: false
};
  gusers: Guser[];
  selectedGuser: Guser;
  lvl: string;
  exp: string;
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
    if(value != this.order.column)
      this.order.asc = true;
    else
      this.order.asc = !this.order.asc;
    this.order.column = value;
  }
}
