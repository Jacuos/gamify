import {Injectable, Component} from "@angular/core";
import {Layout} from "../gadmin/layout";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
/**
 * Created by Jacek on 2017-05-14.
 */
@Component({
  moduleId: module.id,
  selector: 'greet',
  templateUrl: 'greet.component.html',
  //styleUrls: [ 'home.component.css' ]
})
@Injectable()
export class GreetComponent  {
  desc: SafeHtml;


  constructor(private sanitizer: DomSanitizer){}
  ngOnInit(): void {
    if(localStorage.getItem('layout')) {
      var temp = JSON.parse(localStorage.getItem('layout')) as Layout[];
      this.desc = this.sanitizer.bypassSecurityTrustHtml(this.decode(temp[3].value));
    }
  }


  decode(temp: string): string {
    temp = temp.replace(/\\\"/g, "\"");
    console.log(temp);
    return temp;
  }

}
