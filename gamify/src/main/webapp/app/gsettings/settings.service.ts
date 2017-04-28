/**
 * Created by Jacek on 2017-04-27.
 */
import { Injectable }    from '@angular/core';
import {Headers, Http, Response, RequestOptions,} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import{Guser} from '../guser';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class SettingsService {
  baseS = new BehaviorSubject<string>("");
  baseS$ = this.baseS.asObservable();


  private photoUrl = 'http://localhost:7000/api/gsettings/setphoto';
  private descUrl = 'http://localhost:7000/api/gsettings/setdesc';
  private passUrl = 'http://localhost:7000/api/gsettings/setpass';


  constructor(private http: Http) { this.baseS.next("");}


  setPhoto(iid: string, photo: string): Promise<boolean>{
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.baseS.next(photo);
    return this.http.post(this.photoUrl, JSON.stringify({ guserId: iid, photo:  photo}), options)
      .toPromise()
      .then(response => response.json() as boolean)
      .catch(this.handleError);
  }
  setDescription(iid: string, desc: string): Promise<boolean>{
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.descUrl, JSON.stringify({guserId: iid, description:  desc}), options)
      .toPromise()
      .then(response => response.json() as boolean)
      .catch(this.handleError);
  }
  setPassword(iid: string, pass: string): Promise<boolean>{
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.passUrl, JSON.stringify({login: iid, password:  pass}), options)
      .toPromise()
      .then(response => response.json() as boolean)
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
