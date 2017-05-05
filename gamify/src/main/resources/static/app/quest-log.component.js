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
var QuestLogComponent = (function () {
    function QuestLogComponent(guserService) {
        this.guserService = guserService;
        this.urls = new Array();
    }
    QuestLogComponent.prototype.ngOnInit = function () {
        var _this = this;
        var temp = JSON.parse(localStorage.getItem('layout'));
        this.exp = temp[0].value;
        this.guser = JSON.parse(localStorage.getItem('currentUser'));
        this.guserService.getGuserQuests(this.guser.id.toString())
            .then(function (gquest) { return _this.gquests = gquest; });
        this.guserService.getBadges(this.guser.login)
            .then(function (response) { _this.badges = response; _this.urlify(); });
    };
    QuestLogComponent.prototype.urlify = function () {
        for (var _i = 0, _a = this.badges; _i < _a.length; _i++) {
            var badge = _a[_i];
            this.urls.push("http://localhost:7000/api/badge?name=" + badge);
        }
    };
    QuestLogComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'quest-log',
            templateUrl: 'quest-log.component.html',
        }), 
        __metadata('design:paramtypes', [guser_service_1.GuserService])
    ], QuestLogComponent);
    return QuestLogComponent;
}());
exports.QuestLogComponent = QuestLogComponent;
//# sourceMappingURL=quest-log.component.js.map