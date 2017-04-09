/**
 * Created by Jacek on 2017-04-08.
 */

import {Component, Input} from '@angular/core';
import {GadminService} from "./gadmin.service";


@Component({
  moduleId: module.id,
  selector: 'admin-quests',
  templateUrl: 'admin-quests.component.html',
  //styleUrls: [ 'app.component.css' ]
})
export class AdminQuestsComponent  {
  model: any = {};
  response: number;

  constructor(private gadminService: GadminService){}

  ngOnInit(): void {
  }

  generate(form: string): void{
    this.gadminService.newQuest(form)
      .then(response => this.response = response)
  }
}
