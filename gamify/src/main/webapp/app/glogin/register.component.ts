/**
 * Created by Jacek on 2017-03-11.
 */
import {Component, Injectable} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthService} from "./auth.service";
import {Glogin} from "./glogin";
import {Guser} from "../guser";
import {GuserService} from "../guser.service";
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  moduleId: module.id,
  templateUrl: 'register.component.html',
  selector: 'register',
})

export class RegisterComponent {
  rglogin = new Glogin("","",false,"");
  rguser = new Guser(0,"","","","",0,1);
  password2: string;

  searchTerms = new Subject<string>();
  uniqueLogin: Observable<boolean>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private guserService: GuserService) { }

  ngOnInit() {
    this.authService.logout();
    this.uniqueLogin = this.searchTerms
      .debounceTime(400)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.guserService.getGuserExists(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<boolean>())
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<boolean>();
      });
  }
  checkDuplicate(term:string){
    this.searchTerms.next(term);
  }


  onSubmit(form : string) {

    this.authService.createGuser(form)
      .then(res => {
        console.log('Poszło!');
        this.router.navigate(["/"]);
      });

    /*this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.loading = false;
        });*/
  }

}
