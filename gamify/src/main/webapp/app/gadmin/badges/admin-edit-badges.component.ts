/**
 * Created by Jacek on 2017-05-04.
 */



import {Component} from '@angular/core';
import {SettingsService} from "../../gsettings/settings.service";
import {GadminService} from "../gadmin.service";


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
  ready: boolean;
  badges: string[];
  urls = {};

  constructor(private setService: SettingsService, private adminService: GadminService){}

  ngOnInit(): void {
    this.response = false;
    this.ready = false;
    this.adminService.getAllBadges()
      .then(response => {this.badges = response; this.urlify()});
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
    this.badges.push(this.name);
    this.urls[this.name] = this.file;
  }
  urlify(){
    for(let badge of this.badges){
      this.urls[badge] = "http://localhost:7000/api/badge?name="+badge;
    }
    this.ready = true;
  }
  delete(badge: string){
    var r = confirm("Na pewno chcesz usunąć odznakę?");
    if(r == true) {
      console.log("USUWAM");
      this.adminService.removeBadge(badge)
        .then(() => {
          this.badges = this.badges.filter(h => h !== badge);
        });
    }
    else{
      console.log("NIE USUWAM");
    }
  }

}
