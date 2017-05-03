/**
 * Created by Jacek on 16-01-2017.
 */
import { Component, OnInit } from '@angular/core';
import { GuserService }         from './guser.service';
import './rxjs-operators';

import {Gquest} from "./gquest";
import {Guser} from "./guser";
import {ActivatedRoute, Params} from "@angular/router";
import {Layout} from "./gadmin/layout";

@Component({
  moduleId: module.id,
  selector: 'guser-detail',
  templateUrl: 'guser-detail.component.html'
})
export class GuserDetailComponent  {
  public guser: Guser;
  public gquest: Gquest[];
  private sub: any;
  private mode: string;
  lvl: string;
  exp: string;
  constructor(private guserService: GuserService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    var temp = JSON.parse(localStorage.getItem('layout')) as Layout[];
    this.lvl = temp[1].value;
    this.exp = temp[0].value;
    this.sub = this.route
      .params
      .subscribe(params => {
        this.mode = params['id'];
      });

     this.guserService.getGuser(this.mode)
      .then(guser => this.guser = guser);

    this.guserService.getGuserQuests(this.mode)
      .then(gquest => this.gquest = gquest);

  }
}
