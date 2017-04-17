/**
 * Created by Jacek on 2017-04-08.
 */
import { Injectable }    from '@angular/core';
import {Headers, Http, Response, RequestOptions,} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Observable} from "rxjs";
import {Gquest} from "../gquest";

@Injectable()
export class GadminService {

  private newquest = 'http://localhost:7000/api/gadmin/newquest';
  private allquests = 'http://localhost:7000/api/gadmin/allquests';

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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
