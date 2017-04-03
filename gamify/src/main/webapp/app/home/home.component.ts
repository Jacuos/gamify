/**
 * Created by Jacek on 2017-03-02.
 */

import {Component, Input} from '@angular/core';
import { Router }            from '@angular/router';
import {AuthService} from "../glogin/auth.service";
import {Subscription} from "rxjs";
import {Guser} from "../guser";
import {GuserService} from "../guser.service";

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html',
  //styleUrls: [ 'home.component.css' ]
})
export class HomeComponent  {
  title = 'GAMIFY';
  desc = 'Witamy w aplikacji grywalizacyjnej!';
  subscription:Subscription;
  guser: Guser;
  logged: boolean;

  constructor(private authService: AuthService, private guserService: GuserService){}
  ngOnInit(): void {
    this.subscription = this.authService.logged$
      .subscribe(logged => this.logged = logged);
    this.subscription = this.authService.guser$
      .subscribe(guser => this.guser = guser);
    if (localStorage.getItem('currentLogin')) {
      this.logged = true;
    }
    this.reload();
  }
  public reload(): void{
    if (localStorage.getItem('currentUser')) {
      this.guser = JSON.parse(localStorage.getItem('currentUser')) as Guser;
      this.guserService.getGuser(this.guser.id.toString())
        .then(response => this.guser = response);
    }
  }



}
