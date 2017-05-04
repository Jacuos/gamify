/**
 * Created by Jacek on 2017-05-04.
 */
import {Component, Input} from '@angular/core';
import {GforgotService} from "./gforgot.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  moduleId: module.id,
  selector: 'setpass',
  templateUrl: 'gsetpass.component.html',
  //styleUrls: [ 'app.component.css' ]
})
export class GsetpassComponent  {
  email: string;
  token: string;
  password: string;
  response: string;
  loading: boolean
  private sub: any;

  constructor(private gfService: GforgotService, private route: ActivatedRoute, private router: Router){}
  ngOnInit(): void {
    this.loading = false;
    this.sub = this.route
      .params
      .subscribe(params => {
        this.email = params['email'];
        this.token = params['token'];
      });
  }
  send(){
    this.loading = true;
    this.gfService.heSets(this.email, this.token, this.password)
      .then(response => {this.response = response; alert(response);this.router.navigate(["/"]);});
    this.loading = false;
  }

}
