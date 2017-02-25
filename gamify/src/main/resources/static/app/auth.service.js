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
var angular2_jwt_1 = require('angular2-jwt');
var router_1 = require('@angular/router');
var AuthService = (function () {
    function AuthService(router) {
        var _this = this;
        this.router = router;
        // We'll use the Auth0 Lock widget for capturing user credentials
        this.lock = new Auth0Lock('YOUR-AUTH0-CLIENTID', 'YOUR-AUTH0-DOMAIN.auth0.com');
        // We'll listen for an authentication event to be raised and if successful will log the user in.
        this.lock.on('authenticated', function (authResult) {
            localStorage.setItem('id_token', authResult.idToken);
            _this.lock.getProfile(authResult.idToken, function (error, profile) {
                if (error) {
                    console.log(error);
                }
                localStorage.setItem('profile', JSON.stringify(profile));
            });
            _this.lock.hide();
        });
    }
    // This method will display the lock widget
    AuthService.prototype.login = function () {
        this.lock.show();
    };
    // This method will log the use out
    AuthService.prototype.logout = function () {
        // To log out, just remove the token and profile
        // from local storage
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
        // Send the user back to the public deals page after logout
        this.router.navigateByUrl('/auth');
    };
    // Finally, this method will check to see if the user is logged in. We'll be able to tell by checking to see if they have a token and whether that token is valid or not.
    AuthService.prototype.loggedIn = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map