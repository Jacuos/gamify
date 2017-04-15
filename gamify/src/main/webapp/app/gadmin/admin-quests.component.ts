/**
 * Created by Jacek on 2017-04-08.
 */

import {Component, Input, ElementRef} from '@angular/core';
import {GadminService} from "./gadmin.service";
import {QRCodeComponent} from 'angular2-qrcode';


@Component({
  moduleId: module.id,
  selector: 'admin-quests',
  templateUrl: 'admin-quests.component.html',
  //styleUrls: [ 'app.component.css' ]
})

export class AdminQuestsComponent  {
  model: any = {};
  name: string;
  response: number;
  responseAddress: string;
  loading: boolean;

  constructor(private gadminService: GadminService){}

  ngOnInit(): void {
    this.loading = false;
  }

  generate(form: string): void{
    this.loading = true;

    this.gadminService.newQuest(form)
      .then(response => this.response = response)
      .then(response =>{
          if(this.response != -1)
    {
      this.postResponse();
    }
  else
    this.name = null;
  });
    this.loading = false;
  }

  postResponse(){
    this.responseAddress = location.host + "/goquest;qid=" + this.response;
    this.name = this.model.description;
    this.model = {};
  }
}
