import {Component, Input, Injectable} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../glogin/auth.service";
import {Glogin} from "../glogin/glogin";

@Injectable()
@Component({
  moduleId: module.id,
  selector: 'admin-login',
  templateUrl: 'admin-login.component.html',
  //styleUrls: [ 'app.component.css' ]
})
export class AdminLoginComponent  {
  model: any = {};
  loading = false;
  returnUrl: string;
  glogin: Glogin;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService) { }
  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/gadmin';
  }
  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password, false)
      .subscribe(
        data => {
          this.authenticationService.fetchAdditionalData(this.model.username)
            .subscribe(
              data2 =>{
                this.isAdminCheck();
              }
            )
        },
        error => {
          this.loading = false;
        });
  }
  isAdminCheck(){
    if(this.authenticationService.isAdmin){
      this.router.navigate([this.returnUrl]);
    }
    else {
      this.authenticationService.logout();
      this.loading = false;
    }
  }
}
