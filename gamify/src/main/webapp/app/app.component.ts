import {Component, Input} from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.css' ]
})
export class AppComponent  {
  logged: boolean;
  constructor(){
  }
  ngOnInit(): void {
    this.logged = false;
    //this.logcomp.logged.subscribe(value => this.logged = value);
  }
}
