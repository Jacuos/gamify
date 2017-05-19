/**
 * Created by Jacek on 16-01-2017.
 */
import { Component, OnInit } from '@angular/core';
import { GuserService }         from '../guser.service';
import '../rxjs-operators';

import {Gquest} from "../gquest/gquest";
import {Guser} from "../guser";
import {ActivatedRoute, Params} from "@angular/router";
import {Layout} from "../gadmin/layout";
import {AuthService} from "../glogin/auth.service";
import {Subscription} from "rxjs";

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
  badges: string[];
  urls: string[] = new Array();

  token: string;
  subscription:Subscription = this.auth.token$
    .subscribe(token => this.token = token);

  constructor(private guserService: GuserService, private route: ActivatedRoute, private auth: AuthService) { }

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
      .then(guser => {this.guser = guser;this.getBadges()});

    this.guserService.getGuserQuests(this.mode)
      .then(gquest => this.gquest = gquest);

  }
  getBadges(){
    this.guserService.getBadges(this.guser.login)
      .then(response => {this.badges = response;this.urlify();});
  }
  urlify() {
    for (let badge of this.badges) {
      this.urls.push("https://localhost:7000/api/badge?token="+this.token+"&name=" + badge);
    }
  }
}
