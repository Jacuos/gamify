/**
 * Created by Jacek on 2017-04-24.
 */

import {Component, ChangeDetectorRef} from '@angular/core';
import {AuthService} from "../glogin/auth.service";
import {Subscription} from "rxjs";
import {SettingsService} from "./settings.service";
import {Router} from "@angular/router";
import {HomeComponent} from "../ghome/home.component";
import {Guser} from "../gmain/guser";
import {Glogin} from "../glogin/glogin";
import {Form, NgForm} from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: 'settings',
  templateUrl: 'settings.component.html',
  //styleUrls: [ 'home.component.css' ]
})
export class SettingsComponent  {
  subscription2:Subscription;
  guser: Guser;
  url: string;

  token: string;
  subscription:Subscription = this.authService.token$
    .subscribe(token => this.token = token);

  constructor(private authService: AuthService, private setService: SettingsService, private home: HomeComponent){}

  ngOnInit(): void {
    this.reload();
  }
  crop(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      console.log("UPLOAD PHOTO! "+fileInput.target.files[0].name);

      var preview = document.querySelector('img.photo') as HTMLImageElement;
      var reader = new FileReader();
      var url = this.url;
      var serv = this.setService;

      reader.addEventListener("load", function () {
        preview.src = reader.result;
        this.url = preview.src;
      }, false);
      reader.onload = function() {
        if(preview.width > 100 || preview.height > 100) {
          alert("Obrazek ma niepoprawne wymiary: " + preview.width + "x" + preview.height);
        }
        else{
          serv.setPhoto(url.slice(-1), preview.src as string);
        }
      };
      reader.readAsDataURL(fileInput.target.files[0]);
      //this.url = preview.src;
      this.send();

    }
  }
  send(){
      this.subscription2 = this.setService.baseS$
        .subscribe(baseS =>{this.url = baseS; this.home.url = baseS;});
  }
  reload(){
    this.guser = JSON.parse(localStorage.getItem('currentUser')) as Guser;
    this.url = "https://localhost:7000/api/photo?token="+this.token+"&id="+this.guser.id;
    this.setService.baseS.next(this.url);
    var login = JSON.parse(localStorage.getItem('currentLogin')) as Glogin;
  }

  sendDescription(){
    var ok: boolean;
    this.setService.setDescription(this.guser.id.toString(), this.guser.description)
      .then(response => {ok = response; if(ok){alert("Opis został zmieniony");}})
    localStorage.setItem('currentUser', JSON.stringify(this.guser))
  }

  password: string;
  oldPassword: string;
  password2: string;
  response: string;
  sendPassword(passForm: NgForm){
    this.setService.setPassword(this.guser.login, this.password, this.oldPassword)
      .then(response => {this.response = response; passForm.reset(); alert(this.response);});
  }



}
