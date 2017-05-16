/**
 * Created by Jacek on 2017-03-01.
 */
import {Component, ViewEncapsulation,} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html',
  selector: 'login',
})

export class LoginComponent {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.authenticationService.fetchAdditionalData(this.model.username)
          .subscribe(
              data2 =>{
                this.authenticationService.fetchEvenMore()
                  .subscribe(data3 =>{
                this.router.navigate([this.returnUrl]); this.loading = false;}
                )
              }
          )
        },
        error => {
          this.loading = false;
        });
  }

}
