/**
 * Created by Jacek on 2017-04-08.
 */
import { Injectable }    from '@angular/core';
import {Headers, Http, Response, RequestOptions,} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Observable} from "rxjs";
import {Gquest} from "../gquest";
import {Layout} from "./layout";

@Injectable()
export class GadminService {

  private newquest = 'http://localhost:7000/api/gadmin/newquest';
  private allquests = 'http://localhost:7000/api/gadmin/allquests';
  private rmguser = 'http://localhost:7000/api/gadmin/rmguser';
  private layout = 'http://localhost:7000/api/gadmin/getparams';
  private css = 'http://localhost:7000/api/gadmin/getcss';
  private slayout = 'http://localhost:7000/api/gadmin/setparams';
  private scss = 'http://localhost:7000/api/gadmin/setcss';
  private allbadges = 'http://localhost:7000/api/gadmin/allbadges';
  private rmbadge = 'http://localhost:7000/api/gadmin/rmbadge';
  private gvbadge = 'http://localhost:7000/api/gadmin/givebadge';

  constructor(private http: Http) { }

  newQuest(mode: String): Promise<number> {
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.newquest, JSON.stringify(mode), options)
      .toPromise()
      .then(response => response.json() as number)
      .catch(this.handleError);
  }
  allQuests():Promise<Gquest[]>{
    return this.http.get(this.allquests)
      .toPromise()
      .then(response => response.json() as Gquest[])
      .catch(this.handleError);
  }
  removeGuser(id: number): Promise<boolean>{
    return this.http.get(this.rmguser+"?id="+id)
      .toPromise()
      .then(response => response.json() as boolean)
      .catch(this.handleError);
  }
  getLayout():Promise<Layout[]>{
    return this.http.get(this.layout)
      .toPromise()
      .then(response => response.json() as Layout[])
      .catch(this.handleError);
  }
  getCss():Promise<string>{
    return this.http.get(this.css)
      .toPromise()
      .then(response2 => response2.json() as string)
      .catch(this.handleError);
  }
  sendLayout(model: Layout[]):Promise<string>{
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.slayout, JSON.stringify(model), options)
      .toPromise()
      .then(response => response.json() as string)
      .catch(this.handleError);
  }
  sendCss(model: string):Promise<string>{
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.scss, JSON.stringify(model), options)
      .toPromise()
      .then(response => response.json() as string)
      .catch(this.handleError);
  }
  getAllBadges(){
    return this.http.get(this.allbadges)
      .toPromise()
      .then(response => response.json() as string[])
      .catch(this.handleError);
  }
  removeBadge(id: string): Promise<boolean>{
    return this.http.get(this.rmbadge+"?id="+id)
      .toPromise()
      .then(response => response.json() as boolean)
      .catch(this.handleError);
  }
  giveBadge(model: any, badge: string):Promise<string>{
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.gvbadge+"?badge="+badge, JSON.stringify(model), options)
      .toPromise()
      .then(response => response.json() as string)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
