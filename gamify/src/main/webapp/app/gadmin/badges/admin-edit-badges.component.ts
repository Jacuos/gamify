/**
 * Created by Jacek on 2017-05-04.
 */



import {Component} from '@angular/core';
import {SettingsService} from "../../gsettings/settings.service";


@Component({
  moduleId: module.id,
  selector: 'admin-edit-badges',
  templateUrl: 'admin-edit-badges.component.html',
  //styleUrls: [ 'app.component.css' ]
})

export class AdminEditBadgesComponent  {
  name: string;
  file: string;
  response: boolean;

  constructor(private setService: SettingsService){}

  ngOnInit(): void {
    this.response = false;
  }
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event) => {
        this.file = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSubmit(){
    this.setService.setPhoto("badges/"+this.name,this.file)
      .then(response => this.response = response);
  }

}
