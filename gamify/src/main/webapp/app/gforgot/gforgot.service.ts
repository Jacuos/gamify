/**
 * Created by Jacek on 2017-05-03.
 */
import { Injectable }    from '@angular/core';
import {Headers, Http, Response, RequestOptions,} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs";

@Injectable()
export class GforgotService {

  private forgotUrl = 'https://localhost:7000/api/reqreset';
  private resetUrl = 'https://localhost:7000/api/setreset';


  constructor(private http: Http) { }

  heForgot(email: string): Promise<string>{
    return this.http.get(this.forgotUrl+"?email="+email)
      .toPromise()
      .then(response => response.json() as string)
      .catch(this.handleError);
  }
  heSets(email: string, token: string, password: string): Promise<string>{
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.resetUrl, JSON.stringify({ email: email, token:  token, password: password}), options)
      .toPromise()
      .then(response => response.json() as string)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
