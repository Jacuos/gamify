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
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require('./app.component');
var scoreboard_component_1 = require('./scoreboard.component');
var guser_detail_component_1 = require("./guser-detail.component");
var guser_service_1 = require('./guser.service');
var auth_service_1 = require("./glogin/auth.service");
var auth_guard_1 = require("./glogin/auth.guard");
var login_component_1 = require("./glogin/login.component");
var quest_log_component_1 = require("./quest-log.component");
var go_quest_component_1 = require("./go-quest.component");
var guser_search_pipe_1 = require("./guser-search.pipe");
var home_component_1 = require("./home/home.component");
var register_component_1 = require("./glogin/register.component");
var not_found_component_1 = require("./not-found.component");
var password_validator_1 = require("./glogin/password.validator");
var admin_login_component_1 = require("./gadmin/admin-login.component");
var admin_dashboard_component_1 = require("./gadmin/admin-dashboard.component");
var gadmin_component_1 = require("./gadmin/gadmin.component");
var admin_guard_1 = require("./gadmin/admin.guard");
var admin_users_component_1 = require("./gadmin/admin-users.component");
var admin_layout_component_1 = require("./gadmin/admin-layout.component");
var gadmin_service_1 = require("./gadmin/gadmin.service");
var angular2_qrcode_1 = require('angular2-qrcode');
var admin_quests_component_1 = require("./gadmin/quests/admin-quests.component");
var admin_allquests_component_1 = require("./gadmin/quests/admin-allquests.component");
var admin_newquest_component_1 = require("./gadmin/quests/admin-newquest.component");
var settings_component_1 = require("./gsettings/settings.component");
var settings_service_1 = require("./gsettings/settings.service");
var gforgot_component_1 = require("./gforgot/gforgot.component");
var gforgot_service_1 = require("./gforgot/gforgot.service");
var gsetpass_component_1 = require("./gforgot/gsetpass.component");
var admin_badges_component_1 = require("./gadmin/badges/admin-badges.component");
var admin_edit_badges_component_1 = require("./gadmin/badges/admin-edit-badges.component");
var admin_give_badges_component_1 = require("./gadmin/badges/admin-give-badges.component");
var greet_component_1 = require("./home/greet.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, app_routing_module_1.AppRoutingModule, http_1.HttpModule, http_1.JsonpModule, angular2_qrcode_1.QRCodeModule],
            declarations: [app_component_1.AppComponent, scoreboard_component_1.ScoreboardComponent, guser_detail_component_1.GuserDetailComponent, login_component_1.LoginComponent, quest_log_component_1.QuestLogComponent, go_quest_component_1.GoQuestComponent, guser_search_pipe_1.GuserSearchPipe, login_component_1.LoginComponent, home_component_1.HomeComponent, register_component_1.RegisterComponent, not_found_component_1.NotFoundComponent, password_validator_1.PasswordValidator, gadmin_component_1.GadminComponent, admin_login_component_1.AdminLoginComponent, admin_dashboard_component_1.AdminDashboardComponent, admin_quests_component_1.AdminQuestsComponent, admin_users_component_1.AdminUsersComponent, admin_layout_component_1.AdminLayoutComponent, admin_allquests_component_1.AdminAllQuestsComponent, admin_newquest_component_1.AdminNewQuestComponent, settings_component_1.SettingsComponent, gforgot_component_1.GforgotComponent, gsetpass_component_1.GsetpassComponent, admin_badges_component_1.AdminBadgesComponent, admin_edit_badges_component_1.AdminEditBadgesComponent, admin_give_badges_component_1.AdminGiveBadgesComponent, greet_component_1.GreetComponent],
            providers: [guser_service_1.GuserService, auth_service_1.AuthService, auth_guard_1.AuthGuard, admin_guard_1.AdminGuard, gadmin_service_1.GadminService, settings_service_1.SettingsService, gforgot_service_1.GforgotService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map