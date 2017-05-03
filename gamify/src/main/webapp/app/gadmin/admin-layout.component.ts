/**
 * Created by Jacek on 2017-04-08.
 */

import {Component, Input} from '@angular/core';
import {Layout} from "./layout";
import {GadminService} from "./gadmin.service";


@Component({
  moduleId: module.id,
  selector: 'admin-layout',
  templateUrl: 'admin-layout.component.html',
  //styleUrls: [ 'app.component.css' ]
})
export class AdminLayoutComponent  {
  names: Layout[];
  css: string;
  formula: string;
  response: string;

  constructor(private adminService: GadminService){}
  ngOnInit(): void {
    this.adminService.getLayout()
      .then(response => {this.names = response;this.formula = this.names.pop().value;});
    this.adminService.getCss()
      .then(response2 => {this.css = response2;this.css = this.decode(this.css);});
    this.response = "";
  }

  onSubmit(){
    this.response = "";
    var temp = this.names.slice();
    temp.push(new Layout("formula",this.formula));
    this.adminService.sendLayout(temp)
      .then(response => this.response = response);
    this.adminService.sendCss(this.encode(this.css))
      .then(response => this.response = response);
  }
  decode(temp: string): string{
    temp = temp.replace(/%D%A/g,"\r\n");
    temp = temp.replace(/%22/g,"\"");
    temp = temp.replace(/%5C/g,"\\");
    temp = temp.replace(/%7B/g,"{");
    temp = temp.replace(/%7D/g,"}");
    return temp;
  }
  encode(temp: string): string{
    temp = temp.replace(/\r/g,"%D");
    temp = temp.replace(/\n/g,"%A");
    temp = temp.replace(/"/g,"%22");
    temp = temp.replace(/\\/g,"%5C");
    temp = temp.replace(/{/g,"%7B");
    temp = temp.replace(/}/g,"%7D");
    return temp;
}
}
/**/
