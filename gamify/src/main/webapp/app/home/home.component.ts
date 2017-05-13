/**
 * Created by Jacek on 2017-03-02.
 */

import {Component, Input, Inject, Injectable} from '@angular/core';
import {Router, ActivatedRoute, RouterState}            from '@angular/router';
import {AuthService} from "../glogin/auth.service";
import {Subscription, Observable} from "rxjs";
import {Guser} from "../guser";
import {GuserService} from "../guser.service";
import {DOCUMENT} from "@angular/platform-browser";
import {Layout} from "../gadmin/layout";

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html',
  //styleUrls: [ 'home.component.css' ]
})
@Injectable()
export class HomeComponent  {
  desc = 'Witamy w aplikacji grywalizacyjnej!';
  lvl = "Poziom";
  exp = "Doświadczenie";
  guser: Guser;
  logged: boolean;
  url: string;


  token: string;
  subscription:Subscription = this.authService.token$
    .subscribe(token => this.token = token);
  constructor(private authService: AuthService, private guserService: GuserService,   @Inject(DOCUMENT) private document: any){}
  ngOnInit(): void {
    if(localStorage.getItem('layout')) {
      var temp = JSON.parse(localStorage.getItem('layout')) as Layout[];
      this.desc = temp[2].value;
      this.lvl = temp[1].value;
      this.exp = temp[0].value;
    }
    this.subscription = this.authService.logged$
      .subscribe(logged => this.logged = logged);
    this.subscription = this.authService.guser$
      .subscribe(guser => {this.guser = guser; this.url = "https://localhost:7000/api/photo?token="+this.token+"&id="+this.guser.id});

    console.log(this.document.location.href);
    if (localStorage.getItem('currentLogin') && this.document.location.href.search("\/gadmin") == -1 ) {
      this.logged = true;
    }
    this.reload();
  }
  public reload(): void{
    if (localStorage.getItem('currentUser')) {
      this.guser = JSON.parse(localStorage.getItem('currentUser')) as Guser;
      this.guserService.getGuser(this.guser.id.toString())
        .then(response => this.guser = response)
        .then(response => this.url = "https://localhost:7000/api/photo?token="+this.token+"&id="+this.guser.id);
    }
  }



}
