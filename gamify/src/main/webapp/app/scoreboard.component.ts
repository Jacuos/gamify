/**
 * Created by Jacek on 16-01-2017.
 */
import { Component } from '@angular/core';
import {GuserService} from "./guser.service";
import {Guser} from "./guser";
import { Router }            from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'scoreboard',
  templateUrl: 'scoreboard.component.html',
  styleUrls: [ 'scoreboard.component.css' ]
})
export class ScoreboardComponent  {

  gusers: Guser[];
  selectedGuser: Guser;
  constructor(private guserService: GuserService, private router: Router) { }

  ngOnInit(): void {
    this.guserService.getGusers()
      .then(gusers => this.gusers = gusers);
  }
  onSelect(user: Guser): void {
    this.selectedGuser = user;
    this.router.navigate(['/guser', this.selectedGuser.id]);
  }
}
