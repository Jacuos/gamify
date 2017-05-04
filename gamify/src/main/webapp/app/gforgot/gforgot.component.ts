/**
 * Created by Jacek on 2017-05-03.
 */
import {Component, Input} from '@angular/core';
import {GforgotService} from "./gforgot.service";


@Component({
  moduleId: module.id,
  selector: 'forgot',
  templateUrl: 'gforgot.component.html',
  //styleUrls: [ 'app.component.css' ]
})
export class GforgotComponent  {
  email: string;
  response: string;
  loading: boolean;
  constructor(private gfService: GforgotService){}
  ngOnInit(): void {
    this.loading = false;
  }
  send(){
    this.loading = true;
    this.gfService.heForgot(this.email)
      .then(response => this.response = response);
    this.email = "";
    this.loading = false;
  }

}
