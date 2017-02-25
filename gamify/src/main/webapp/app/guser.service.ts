/**
 * Created by Jacek on 21-01-2017.
 */
import { Injectable }    from '@angular/core';
import {Headers, Http , Response,  } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import{Gquest} from './gquest';
import{Guser} from './guser';

@Injectable()
export class GuserService {

  private helloUrl = 'http://localhost:7000/api/hello';
  private guserUrl = 'http://localhost:7000/api/guser';
  private gusersUrl = 'http://localhost:7000/api/gusers';
  private gquestsUrl = 'http://localhost:7000/api/guserquests';

  constructor(private http: Http) { }

  getGuser(mode: String): Promise<Guser> {
    return this.http.get(this.guserUrl+"/?id="+mode)
      .toPromise()
      .then(response => response.json() as Guser)
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


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
