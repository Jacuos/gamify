/**
 * Created by Jacek on 2017-04-06.
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Glogin} from "../glogin/glogin";
import {AdminLoginComponent} from "./admin-login.component";
import {AuthService} from "../glogin/auth.service";

@Injectable()
export class AdminGuard implements CanActivate {
  private glogin: Glogin;
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAdmin) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    else {
      console.log("You shall not pass");
      this.router.navigate(['/gadmin/login']);
      return false;
    }
  }
}
