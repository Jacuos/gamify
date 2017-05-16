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
var guser_service_1 = require("./guser.service");
var router_1 = require('@angular/router');
var ScoreboardComponent = (function () {
    function ScoreboardComponent(guserService, router) {
        this.guserService = guserService;
        this.router = router;
        this.order = {
            column: "",
            asc: false,
        };
        this.ascDescSign = { 'login': '˄', 'firstName': '˄', 'lastName': '˄', 'lvl': '˄', 'exp': '˄', 'description': '˄' };
    }
    ScoreboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        var temp = JSON.parse(localStorage.getItem('layout'));
        this.lvl = temp[1].value;
        this.exp = temp[0].value;
        this.guserService.getGusers()
            .then(function (gusers) { return _this.gusers = gusers; });
    };
    ScoreboardComponent.prototype.onSelect = function (user) {
        this.selectedGuser = user;
        this.router.navigate(['/guser', { id: this.selectedGuser.id }]);
    };
    ScoreboardComponent.prototype.setOrder = function (value) {
        if (value != this.order.column) {
            this.order.asc = true;
            this.ascDescSign[value] = '˄';
        }
        else {
            this.order.asc = !this.order.asc;
            if (this.ascDescSign[value] == '˅')
                this.ascDescSign[value] = '˄';
            else
                this.ascDescSign[value] = '˅';
        }
        this.order.column = value;
    };
    ScoreboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'scoreboard',
            templateUrl: 'scoreboard.component.html',
        }), 
        __metadata('design:paramtypes', [guser_service_1.GuserService, router_1.Router])
    ], ScoreboardComponent);
    return ScoreboardComponent;
}());
exports.ScoreboardComponent = ScoreboardComponent;
//# sourceMappingURL=scoreboard.component.js.map