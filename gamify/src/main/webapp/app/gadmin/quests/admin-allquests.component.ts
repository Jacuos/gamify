/**
 * Created by Jacek on 2017-04-17.
 */

import {Component, Input, ElementRef} from '@angular/core';
import {GadminService} from "../gadmin.service";
import {QRCodeComponent} from 'angular2-qrcode';
import {Gquest} from "../../gquest";


@Component({
  moduleId: module.id,
  selector: 'admin-allquests',
  templateUrl: 'admin-allquests.component.html',
  //styleUrls: [ 'app.component.css' ]
})

export class AdminAllQuestsComponent  {
  quests: Gquest[];
  date: any;
  constructor(private gadminService: GadminService){}

  ngOnInit(): void {
    this.gadminService.allQuests()
      .then(quests => this.quests = quests)
      .then(quests => {
        for (let quest of this.quests) {
          this.date = quest.endOf;
          quest.endOf = new Date(this.date.year,this.date.monthValue, this.date.dayOfMonth, this.date.hour, this.date.minute, this.date.second, this.date.nano*1000000);
        }
      }
    );
  }

}
