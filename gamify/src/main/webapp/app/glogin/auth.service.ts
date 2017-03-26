/**
 * Created by Jacek on 2017-03-01.
 */
import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class AuthService {

  private gaddUrl = 'http://localhost:7000/api/addguser';

  logged = new BehaviorSubject<boolean>(false);
  logged$ = this.logged.asObservable();
  constructor(private http: Http) {}

  login(username: string, password: string) {
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api/glogin', JSON.stringify({ login: username, password: password }), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.logged.next(true);
        }
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
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
