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
 * Created by Jacek on 16-01-2017.
 */
var core_1 = require('@angular/core');
var guser_service_1 = require('./guser.service');
require('./rxjs-operators');
var router_1 = require("@angular/router");
var GuserDetailComponent = (function () {
    function GuserDetailComponent(guserService, route) {
        this.guserService = guserService;
        this.route = route;
    }
    GuserDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        var temp = JSON.parse(localStorage.getItem('layout'));
        this.lvl = temp[1].value;
        this.exp = temp[0].value;
        this.sub = this.route
            .params
            .subscribe(function (params) {
            _this.mode = params['id'];
        });
        this.guserService.getGuser(this.mode)
            .then(function (guser) { return _this.guser = guser; });
        this.guserService.getGuserQuests(this.mode)
            .then(function (gquest) { return _this.gquest = gquest; });
    };
    GuserDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'guser-detail',
            templateUrl: 'guser-detail.component.html'
        }), 
        __metadata('design:paramtypes', [guser_service_1.GuserService, router_1.ActivatedRoute])
    ], GuserDetailComponent);
    return GuserDetailComponent;
}());
exports.GuserDetailComponent = GuserDetailComponent;
//# sourceMappingURL=guser-detail.component.js.map