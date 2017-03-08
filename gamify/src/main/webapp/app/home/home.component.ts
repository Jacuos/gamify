/**
 * Created by Jacek on 2017-03-02.
 */

import { Component } from '@angular/core';
import { Router }            from '@angular/router';
import {AuthService} from "../glogin/auth.service";
import {Subscription} from "rxjs";

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
  logged: boolean;

  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.subscription = this.authService.logged$
      .subscribe(logged => this.logged = logged);
  }

}
