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
 * Created by Jacek on 21-01-2017.
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var auth_service_1 = require("./glogin/auth.service");
var GuserService = (function () {
    function GuserService(http, auth) {
        var _this = this;
        this.http = http;
        this.auth = auth;
        this.helloUrl = 'https://localhost:7000/api/hello?token=';
        this.guserUrl = 'https://localhost:7000/api/guser?token=';
        this.gusersUrl = 'https://localhost:7000/api/gusers?token=';
        this.gquestsUrl = 'https://localhost:7000/api/guserquests?token=';
        this.addquestUrl = 'https://localhost:7000/api/addmequest?token=';
        this.getbadgesUrl = 'https://localhost:7000/api/mybadges?token=';
        this.guserExUrl = 'https://localhost:7000/api/guserexists?token=';
        this.subscription = this.auth.token$
            .subscribe(function (token) { return _this.token = token; });
    }
    GuserService.prototype.getGuser = function (mode) {
        return this.http.get(this.guserUrl + this.token + "&id=" + mode)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    GuserService.prototype.getGuserExists = function (mode) {
        return this.http.get(this.guserExUrl + this.token + "&id=" + mode)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    GuserService.prototype.getGuserQuests = function (mode) {
        return this.http.get(this.gquestsUrl + this.token + "&id=" + mode)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    GuserService.prototype.getGusers = function () {
        return this.http.get(this.gusersUrl + this.token)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    GuserService.prototype.addQuest = function (iid, qqid) {
        var headers = new http_1.Headers({ 'content-type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.addquestUrl + this.token, JSON.stringify({ guserId: iid, gquestId: qqid }), options)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    GuserService.prototype.getBadges = function (login) {
        return this.http.get(this.getbadgesUrl + this.token + "&login=" + login)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    GuserService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    GuserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthService])
    ], GuserService);
    return GuserService;
}());
exports.GuserService = GuserService;
//# sourceMappingURL=guser.service.js.map