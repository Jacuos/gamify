/**
 * Created by Jacek on 2017-04-04.
 */
import {Component, Input} from '@angular/core';
import {Guser} from "../gmain/guser";
import {AuthService} from "../glogin/auth.service";
import {Subscription} from "rxjs";


@Component({
  moduleId: module.id,
  selector: 'admin-dashboard',
  templateUrl: 'admin-dashboard.component.html',
  //styleUrls: [ 'app.component.css' ]
})
export class AdminDashboardComponent  {
  guser: Guser;
  url: string;

  token: string;
  subscription:Subscription = this.auth.token$
    .subscribe(token => this.token = token);
  constructor(private auth: AuthService){
  }
  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.guser = JSON.parse(localStorage.getItem('currentUser')) as Guser;
      this.url = "https://localhost:7000/api/photo?token="+this.token+"&id="+this.guser.id;
    }
  }
}
