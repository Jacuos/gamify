/**
 * Created by Jacek on 2017-03-11.
 */
import { Component,} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthService} from "./auth.service";
import {Glogin} from "./glogin";
import {Guser} from "../guser";

@Component({
  moduleId: module.id,
  templateUrl: 'register.component.html',
  selector: 'register'
})

export class RegisterComponent {
  rglogin = new Glogin("","",false,"");
  rguser = new Guser(0,"","","","",0,1);
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.authService.logout();
  }

  onSubmit() {
    console.log('Poszło!');
    /*this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.loading = false;
        });*/
  }

}
