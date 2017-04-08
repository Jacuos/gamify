/**
 * Created by Jacek on 2017-04-04.
 */
import {Component, Input} from '@angular/core';
import {Guser} from "../guser";


@Component({
  moduleId: module.id,
  selector: 'admin-dashboard',
  templateUrl: 'admin-dashboard.component.html',
  //styleUrls: [ 'app.component.css' ]
})
export class AdminDashboardComponent  {
  guser: Guser;
  constructor(){
  }
  ngOnInit(): void {
    if (localStorage.getItem('currentUser'))
      this.guser = JSON.parse(localStorage.getItem('currentUser')) as Guser;
  }
}
