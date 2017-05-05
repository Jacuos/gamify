/**
 * Created by Jacek on 21-01-2017.
 */
import { Injectable }    from '@angular/core';
import {Headers, Http, Response, RequestOptions,} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import{Gquest} from './gquest';
import{Guser} from './guser';
import {Observable} from "rxjs";

@Injectable()
export class GuserService {

  private helloUrl = 'http://localhost:7000/api/hello';
  private guserUrl = 'http://localhost:7000/api/guser';
  private gusersUrl = 'http://localhost:7000/api/gusers';
  private gquestsUrl = 'http://localhost:7000/api/guserquests';
  private addquestUrl = 'http://localhost:7000/api/addmequest';
  private getbadgesUrl = 'http://localhost:7000/api/mybadges';

  constructor(private http: Http) { }

  getGuser(mode: String): Promise<Guser> {
    return this.http.get(this.guserUrl+"/?id="+mode)
      .toPromise()
      .then(response => response.json() as Guser)
      .catch(this.handleError);

  }
  getGuserExists(mode: String): Observable<boolean> {
    return this.http.get(this.guserUrl+"exists/?id="+mode)
      .map(response => response.json() as boolean)
      .catch(this.handleError);
  }

  getGuserQuests(mode: String): Promise<Gquest[]> {
    return this.http.get(this.gquestsUrl+"/?id="+mode)
      .toPromise()
      .then(response => response.json() as Gquest[])
      .catch(this.handleError);

  }

  getGusers(): Promise<Guser[]>{
    return this.http.get(this.gusersUrl)
      .toPromise()
      .then(response => response.json() as Guser[])
      .catch(this.handleError);
  }

  addQuest(iid: number, qqid: number): Promise<string>{
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.addquestUrl, JSON.stringify({ guserId: iid, gquestId:  qqid}), options)
      .toPromise()
      .then(response => response.json() as string)
      .catch(this.handleError);
  }
  getBadges(login: String): Promise<string[]> {
    return this.http.get(this.getbadgesUrl+"/?login="+login)
      .toPromise()
      .then(response => response.json() as string[])
      .catch(this.handleError);

  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
