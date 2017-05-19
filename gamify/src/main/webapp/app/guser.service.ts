/**
 * Created by Jacek on 21-01-2017.
 */
import { Injectable }    from '@angular/core';
import {Headers, Http, Response, RequestOptions,} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import{Gquest} from './gquest/gquest';
import{Guser} from './guser';
import {Observable, Subscription} from "rxjs";
import {AuthService} from "./glogin/auth.service";

@Injectable()
export class GuserService {

  private helloUrl = 'https://localhost:7000/api/hello?token=';
  private guserUrl = 'https://localhost:7000/api/guser?token=';
  private gusersUrl = 'https://localhost:7000/api/gusers?token=';
  private gquestsUrl = 'https://localhost:7000/api/guserquests?token=';
  private addquestUrl = 'https://localhost:7000/api/addmequest?token=';
  private getbadgesUrl = 'https://localhost:7000/api/mybadges?token=';
  private guserExUrl = 'https://localhost:7000/api/guserexists?token=';

  token: string;
  subscription:Subscription = this.auth.token$
    .subscribe(token => this.token = token);
  constructor(private http: Http, private auth: AuthService) {}


  getGuser(mode: String): Promise<Guser> {
    return this.http.get(this.guserUrl+this.token+"&id="+mode)
      .toPromise()
      .then(response => response.json() as Guser)
      .catch(this.handleError);

  }
  getGuserExists(mode: String): Observable<boolean> {
    return this.http.get(this.guserExUrl+this.token+"&id="+mode)
      .map(response => response.json() as boolean)
      .catch(this.handleError);
  }

  getGuserQuests(mode: String): Promise<Gquest[]> {
    return this.http.get(this.gquestsUrl+this.token+"&id="+mode)
      .toPromise()
      .then(response => response.json() as Gquest[])
      .catch(this.handleError);

  }

  getGusers(): Promise<Guser[]>{
    return this.http.get(this.gusersUrl+this.token)
      .toPromise()
      .then(response => response.json() as Guser[])
      .catch(this.handleError);
  }

  addQuest(iid: number, qqid: number): Promise<string>{
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.addquestUrl+this.token, JSON.stringify({ guserId: iid, gquestId:  qqid}), options)
      .toPromise()
      .then(response => response.json() as string)
      .catch(this.handleError);
  }
  getBadges(login: String): Promise<string[]> {
    return this.http.get(this.getbadgesUrl+this.token+"&login="+login)
      .toPromise()
      .then(response => response.json() as string[])
      .catch(this.handleError);

  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
