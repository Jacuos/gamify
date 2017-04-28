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
 * Created by Jacek on 18-01-2017.
 */
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var scoreboard_component_1 = require('./scoreboard.component');
var guser_detail_component_1 = require("./guser-detail.component");
var login_component_1 = require("./glogin/login.component");
var quest_log_component_1 = require("./quest-log.component");
var go_quest_component_1 = require("./go-quest.component");
var auth_guard_1 = require("./glogin/auth.guard");
var register_component_1 = require("./glogin/register.component");
var not_found_component_1 = require("./not-found.component");
var admin_login_component_1 = require("./gadmin/admin-login.component");
var admin_dashboard_component_1 = require("./gadmin/admin-dashboard.component");
var gadmin_component_1 = require("./gadmin/gadmin.component");
var admin_guard_1 = require("./gadmin/admin.guard");
var admin_quests_component_1 = require("./gadmin/quests/admin-quests.component");
var admin_users_component_1 = require("./gadmin/admin-users.component");
var admin_layout_component_1 = require("./gadmin/admin-layout.component");
var admin_allquests_component_1 = require("./gadmin/quests/admin-allquests.component");
var admin_newquest_component_1 = require("./gadmin/quests/admin-newquest.component");
var settings_component_1 = require("./gsettings/settings.component");
var routes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'gadmin', redirectTo: '/gadmin/dashboard', pathMatch: 'full' },
    { path: 'gadmin', component: gadmin_component_1.GadminComponent, children: [
            { path: 'login', component: admin_login_component_1.AdminLoginComponent },
            { path: 'dashboard', component: admin_dashboard_component_1.AdminDashboardComponent, canActivate: [admin_guard_1.AdminGuard], children: [
                    { path: 'quests', component: admin_quests_component_1.AdminQuestsComponent, children: [{ path: 'new', component: admin_newquest_component_1.AdminNewQuestComponent }, { path: 'all', component: admin_allquests_component_1.AdminAllQuestsComponent }] },
                    { path: 'users', component: admin_users_component_1.AdminUsersComponent },
                    { path: 'layout', component: admin_layout_component_1.AdminLayoutComponent },
                ]
            },
            { path: '**', redirectTo: 'gadmin/dashboard', pathMatch: 'full' },
        ]
    },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'scoreboard', component: scoreboard_component_1.ScoreboardComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'guser', component: guser_detail_component_1.GuserDetailComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'questlog', component: quest_log_component_1.QuestLogComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'goquest', component: go_quest_component_1.GoQuestComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'settings', component: settings_component_1.SettingsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: '', redirectTo: '/scoreboard', pathMatch: 'full', canActivate: [auth_guard_1.AuthGuard] },
    { path: '**', component: not_found_component_1.NotFoundComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map