/**
 * Created by Jacek on 2017-04-17.
 */


import {Component, Input, ElementRef} from '@angular/core';
import {GadminService} from "../gadmin.service";
import {QRCodeComponent} from 'angular2-qrcode';


@Component({
  moduleId: module.id,
  selector: 'admin-quests',
  templateUrl: 'admin-quests.component.html',
  //styleUrls: [ 'app.component.css' ]
})

export class AdminQuestsComponent  {


  constructor(){}

  ngOnInit(): void {
  }

}

