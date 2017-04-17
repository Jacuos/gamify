/**
 * Created by Jacek on 2017-04-08.
 */

import {Component, Input} from '@angular/core';
import {Guser} from "../guser";
import {GuserService} from "../guser.service";
import {Router} from "@angular/router";


@Component({
  moduleId: module.id,
  selector: 'admin-users',
  templateUrl: 'admin-users.component.html',
  //styleUrls: [ 'app.component.css' ]
})
export class AdminUsersComponent  {

  search: string;
  order = {
    column: "",
    asc: false
  };
  gusers: Guser[];
  selectedGuser: Guser;
  constructor(private guserService: GuserService, private router: Router) { }

  ngOnInit(): void {
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
  delete(user: Guser): void{
     var r = confirm('Na pewno chcesz usunąć użytkownika '+user.login+"?");
     if(r == true) {
       console.log("USUWAM");
       this.guserService.removeGuser(user.id)
         .then(() => {
           this.gusers = this.gusers.filter(h => h !== user);
           if (this.selectedGuser === user) { this.selectedGuser = null; }
         });
     }
       else{
       console.log("NIE USUWAM");
     }
  }
}
