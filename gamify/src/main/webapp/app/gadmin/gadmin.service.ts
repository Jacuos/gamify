/**
 * Created by Jacek on 2017-04-08.
 */
import { Injectable }    from '@angular/core';
import {Headers, Http, Response, RequestOptions,} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Observable, Subscription} from "rxjs";
import {Gquest} from "../gquest/gquest";
import {Layout} from "./layout";
import {AuthService} from "../glogin/auth.service";

@Injectable()
export class GadminService {

  private newquest = 'https://localhost:7000/api/gadmin/newquest?token=';
  private allquests = 'https://localhost:7000/api/gadmin/allquests?token=';
  private rmguser = 'https://localhost:7000/api/gadmin/rmguser?token=';
  private layout = 'https://localhost:7000/api/gadmin/getparams?token=';
  private css = 'https://localhost:7000/api/gadmin/getcss?token=';
  private slayout = 'https://localhost:7000/api/gadmin/setparams?token=';
  private scss = 'https://localhost:7000/api/gadmin/setcss?token=';
  private allbadges = 'https://localhost:7000/api/gadmin/allbadges?token=';
  private rmbadge = 'https://localhost:7000/api/gadmin/rmbadge?token=';
  private gvbadge = 'https://localhost:7000/api/gadmin/givebadge?token=';

  token: string;
  subscription:Subscription = this.auth.token$
    .subscribe(token => this.token = token);

  constructor(private http: Http, private auth: AuthService) { }

  newQuest(mode: String): Promise<number> {
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.newquest+this.token, JSON.stringify(mode), options)
      .toPromise()
      .then(response => response.json() as number)
      .catch(this.handleError);
  }
  allQuests():Promise<Gquest[]>{
    return this.http.get(this.allquests+this.token)
      .toPromise()
      .then(response => response.json() as Gquest[])
      .catch(this.handleError);
  }
  removeGuser(id: number): Promise<boolean>{
    return this.http.get(this.rmguser+this.token+"&id="+id)
      .toPromise()
      .then(response => response.json() as boolean)
      .catch(this.handleError);
  }
  getLayout():Promise<Layout[]>{
    return this.http.get(this.layout+this.token)
      .toPromise()
      .then(response => response.json() as Layout[])
      .catch(this.handleError);
  }
  getCss():Promise<string>{
    return this.http.get(this.css+this.token)
      .toPromise()
      .then(response2 => response2.json() as string)
      .catch(this.handleError);
  }
  sendLayout(model: Layout[]):Promise<string>{
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.slayout+this.token, JSON.stringify(model), options)
      .toPromise()
      .then(response => response.json() as string)
      .catch(this.handleError);
  }
  sendCss(model: string):Promise<string>{
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.scss+this.token, JSON.stringify(model), options)
      .toPromise()
      .then(response => response.json() as string)
      .catch(this.handleError);
  }
  getAllBadges(){
    return this.http.get(this.allbadges+this.token)
      .toPromise()
      .then(response => response.json() as string[])
      .catch(this.handleError);
  }
  removeBadge(id: string): Promise<boolean>{
    return this.http.get(this.rmbadge+this.token+"&id="+id)
      .toPromise()
      .then(response => response.json() as boolean)
      .catch(this.handleError);
  }
  giveBadge(model: any, badge: string):Promise<string>{
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.gvbadge+this.token+"&badge="+badge, JSON.stringify(model), options)
      .toPromise()
      .then(response => response.json() as string)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
