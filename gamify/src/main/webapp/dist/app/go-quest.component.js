"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Jacek on 23-01-2017.
 */
var core_1 = require('@angular/core');
var guser_service_1 = require("./guser.service");
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var GoQuestComponent = (function () {
    function GoQuestComponent(guserService, route, router, home) {
        this.guserService = guserService;
        this.route = route;
        this.router = router;
        this.home = home;
        this.qid = null;
    }
    GoQuestComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.guser = JSON.parse(localStorage.getItem('currentUser'));
        this.sub = this.route
            .params
            .subscribe(function (params) {
            _this.qid = params['qid'];
        });
        if (this.qid != null)
            this.sendRequest();
        /*this.guserService.getGuser(this.mode)
          .then(guser => this.guser = guser);
    
        this.guserService.getGuserQuests(this.mode)
          .then(gquest => this.gquest = gquest);*/
    };
    GoQuestComponent.prototype.sendRequest = function () {
        var _this = this;
        if (this.qid > 0) {
            console.log('Leci!');
            this.guserService.addQuest(this.guser.id, this.qid)
                .then(function (response) { return _this.response = response; })
                .then(function (response) { return _this.home.reload(); });
            this.qid = null;
        }
        this.router.navigate(['/goquest']);
    };
    GoQuestComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'go-quest',
            templateUrl: 'go-quest.component.html',
        }), 
        __metadata('design:paramtypes', [guser_service_1.GuserService, router_1.ActivatedRoute, router_1.Router, home_component_1.HomeComponent])
    ], GoQuestComponent);
    return GoQuestComponent;
}());
exports.GoQuestComponent = GoQuestComponent;
//# sourceMappingURL=go-quest.component.js.map