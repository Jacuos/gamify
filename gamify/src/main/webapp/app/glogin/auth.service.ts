/**
 * Created by Jacek on 2017-03-01.
 */
import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Glogin} from "./glogin";
import {GuserService} from "../gmain/guser.service";
import {Guser} from "../gmain/guser";
import {Router} from "@angular/router";


@Injectable()
export class AuthService {

  private gaddUrl = 'https://localhost:7000/api/addguser';

  logged = new BehaviorSubject<boolean>(false);
  logged$ = this.logged.asObservable();

  guser = new BehaviorSubject<Guser>(new Guser(0,"","","","",0,0));
  guser$ = this.guser.asObservable();

  token = new BehaviorSubject<string>("no_token");
  token$ = this.token.asObservable();

  isAdmin: boolean;
  constructor(private http: Http) {
    if(localStorage.getItem('currentLogin')) {
      var test = JSON.parse(localStorage.getItem('currentLogin')) as Glogin;
      this.token.next(test.password);
      if(test.isAdmin)
        this.isAdmin = true;
    }
    else
      this.isAdmin = false;}

  login(username: string, password: string, notAdmin: boolean = true) {
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('https://localhost:7000/api/glogin', JSON.stringify({ login: username, password: password }), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if(user == "BAN") {
          alert("Otrzymałeś 24-godzinną blokadę ze względu na zbyt dużą liczbę nieudanych prób logowania.");
          return;
        }
        else if (user) {
          this.token.next(user.password);
          this.isAdmin = user.isAdmin;
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentLogin', JSON.stringify(user));
          console.log(JSON.parse(localStorage.getItem('currentLogin')) as Glogin);
          this.logged.next(notAdmin);
        }
      });
  }
  fetchAdditionalData(username : string){
    return this.http.get("https://localhost:7000/api/guser?token="+this.token.getValue()+"&log="+username)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let data = response.json();
        if (data) {
          localStorage.setItem('currentUser', JSON.stringify(data));
          console.log(JSON.parse(localStorage.getItem('currentUser')) as Guser);
          this.guser.next(JSON.parse(localStorage.getItem('currentUser')) as Guser);
        }
      });

  }
  fetchEvenMore(){
    return this.http.get("https://localhost:7000/api/gadmin/getparams?token="+this.token.getValue())
      .map((response: Response) => {
        let data = response.json();
        if (data) {
          localStorage.setItem('layout', JSON.stringify(data));
        }
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentLogin');
    localStorage.removeItem('currentUser');
    this.isAdmin = false;
    this.logged.next(false);
  }
  createGuser(guser: string): Promise<string>{
    let headers = new Headers({ 'content-type': 'application/json' });
    return this.http
      .post(this.gaddUrl, JSON.stringify({guser}), {headers: headers})
      .toPromise()
      .then(res => res.json().data as string)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
