webpackJsonp([0],{

/***/ 110:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 110;

/***/ }),

/***/ 151:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 151;

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__capacitor_core__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_TinyServer_dist_esm_index__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_game_state_game_state__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__settings_settings__ = __webpack_require__(200);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var Modals = __WEBPACK_IMPORTED_MODULE_2__capacitor_core__["a" /* Plugins */].Modals;
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, modalCtrl, platform, gameState) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.platform = platform;
        this.gameState = gameState;
    }
    Object.defineProperty(HomePage.prototype, "serverSettingsAvailable", {
        get: function () {
            return this.platform.is('cordova');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomePage.prototype, "turn", {
        get: function () {
            return this.gameState.turn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomePage.prototype, "timer1", {
        get: function () {
            return this.gameState.timer1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomePage.prototype, "timer2", {
        get: function () {
            return this.gameState.timer2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomePage.prototype, "gameStarted", {
        get: function () {
            return this.gameState.gameStarted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomePage.prototype, "cp1", {
        get: function () {
            return this.gameState.cp1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomePage.prototype, "cp2", {
        get: function () {
            return this.gameState.cp2;
        },
        enumerable: true,
        configurable: true
    });
    HomePage.prototype.showServerSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_3_TinyServer_dist_esm_index__["a" /* TinyServerPlugin */].getURL()];
                    case 1:
                        url = _a.sent();
                        console.log(url);
                        return [4 /*yield*/, Modals.alert({
                                title: "Web Server Url",
                                message: url.url
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.showSettings = function () {
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__settings_settings__["a" /* SettingsPage */]);
        profileModal.present();
    };
    HomePage.prototype.reset = function () {
        return __awaiter(this, void 0, void 0, function () {
            var confirmResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Modals.confirm({
                            title: "Reset Game",
                            message: "Are you sure you want to reset this game?",
                            okButtonTitle: "Yes",
                            cancelButtonTitle: "No"
                        })];
                    case 1:
                        confirmResult = _a.sent();
                        if (confirmResult.value) {
                            this.gameState.resetGameState();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.togglePause = function (isForcedStop) {
        this.gameState.togglePause(isForcedStop);
    };
    ;
    HomePage.prototype.actionLabel = function () {
        if (this.timer1.isTicking || this.timer2.isTicking) {
            return "Pause";
        }
        if (this.timer1.isOutOfTime || this.timer2.isOutOfTime) {
            return "Reset";
        }
        return this.gameStarted ? "Resume" : "Start";
    };
    ;
    HomePage.prototype.move = function () {
        this.gameState.move();
    };
    HomePage.prototype.start = function (timerIndex) {
        this.gameState.start(timerIndex);
    };
    HomePage.prototype.incrementTurn = function () {
        this.gameState.incrementTurn();
    };
    HomePage.prototype.decrementTurn = function () {
        this.gameState.decrementTurn();
    };
    HomePage.prototype.incrementCP = function (playerIndex) {
        this.gameState.incrementCP(playerIndex);
    };
    HomePage.prototype.decrementCP = function (playerIndex) {
        this.gameState.decrementCP(playerIndex);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/Drew/Dev/Brutal Damage/ionic-game-clock/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Dual Attack\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="showServerSettings()" *ngIf="serverSettingsAvailable">\n        <ion-icon name="wifi"></ion-icon>\n      </button>\n      <button ion-button icon-only (click)="showSettings()">\n        <ion-icon name="settings"></ion-icon>\n      </button>\n      <button ion-button icon-only (click)="reset()">\n        <ion-icon name="refresh"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div>\n    <!--Timers-->\n    <ion-grid>\n      <ion-row>\n        <ion-col class="well left-clock timer">\n          <button ion-button large (click)="move()" *ngIf="gameStarted">{{timer1.toString()}}</button>\n          <button ion-button large (click)="start(0)" *ngIf="!gameStarted">START</button>\n          <div class="stepper-container">\n              <button class="stepper" color="dark" ion-button small (click)="decrementCP(0)" [disabled]="!gameStarted">-</button>\n              <ion-label class="stepper-label">CP {{cp1}}</ion-label>\n              <button class="stepper" color="dark" ion-button small (click)="incrementCP(0)" [disabled]="!gameStarted">+</button>\n          </div>\n        </ion-col>\n        <ion-col col-auto>\n          <div class="center">\n            <button ion-button color="secondary" class="pause" (click)="togglePause()" [disabled]="!gameStarted">{{actionLabel()}}</button>\n          </div>\n          <div class="stepper-container">\n              <button class="stepper" color="dark" ion-button small (click)="decrementTurn()" [disabled]="!gameStarted">-</button>\n              <ion-label class="stepper-label">Turn {{turn}}</ion-label>\n              <button class="stepper" color="dark" ion-button small (click)="incrementTurn()" [disabled]="!gameStarted">+</button>\n          </div>\n        </ion-col>\n        <ion-col class="well right-clock timer">\n          <button ion-button large (click)="move()" *ngIf="gameStarted">{{timer2.toString()}}</button>\n          <button ion-button large (click)="start(1)" *ngIf="!gameStarted">START</button>\n          <div class="stepper-container">\n              <button class="stepper" color="dark" ion-button small (click)="decrementCP(1)" [disabled]="!gameStarted">-</button>\n              <ion-label class="stepper-label">CP {{cp2}}</ion-label>\n              <button class="stepper" color="dark" ion-button small (click)="incrementCP(1)" [disabled]="!gameStarted">+</button>\n          </div>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/Drew/Dev/Brutal Damage/ionic-game-clock/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__providers_game_state_game_state__["a" /* GameStateProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_game_state_game_state__ = __webpack_require__(51);
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
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingsPage = /** @class */ (function () {
    function SettingsPage(navCtrl, navParams, gameState) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.gameState = gameState;
        this.gameType = gameState.currentGameSetting;
    }
    SettingsPage.prototype.onSelectChange = function (selectedValue) {
        this.gameType = selectedValue;
        this.gameState.updateClockSettings(selectedValue);
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"/Users/Drew/Dev/Brutal Damage/ionic-game-clock/src/pages/settings/settings.html"*/'<!--\n  Generated template for the SettingsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Settings</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n    <ion-item>\n      <ion-label>Game Size</ion-label>\n      <ion-select [(ngModel)]="gameType" (ionChange)="onSelectChange($event)">\n        <ion-option value="0">0 points / 20 minutes</ion-option>\n        <ion-option value="1">25 points / 30 minutes</ion-option>\n        <ion-option value="2">50 points / 42 minutes</ion-option>\n        <ion-option value="3">75 points / 60 minutes</ion-option>\n        <ion-option value="4">100 points / 75 minutes</ion-option>\n        <ion-option value="5">150 points / 120 minutes</ion-option>\n        <ion-option value="6">200 points / 150 minutes</ion-option>\n      </ion-select>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/Drew/Dev/Brutal Damage/ionic-game-clock/src/pages/settings/settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_game_state_game_state__["a" /* GameStateProvider */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(224);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_settings_settings__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_game_state_game_state__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_settings_settings__["a" /* SettingsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_settings_settings__["a" /* SettingsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_8__providers_game_state_game_state__["a" /* GameStateProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_game_state_game_state__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_TinyServer_dist_esm_index__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(199);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, gameState) {
        var _this = this;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */];
        this._gameState = gameState;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            __WEBPACK_IMPORTED_MODULE_5_TinyServer_dist_esm_index__["a" /* TinyServerPlugin */].startServer().then(function () {
                __WEBPACK_IMPORTED_MODULE_5_TinyServer_dist_esm_index__["a" /* TinyServerPlugin */].onRequest(function (data) { return _this.handleOnRequest(data); });
            });
        });
    }
    MyApp.prototype.handleOnRequest = function (data) {
        if (data.path.includes("data")) {
            var json = {
                timer1: this._gameState.timer1.toString(),
                timer2: this._gameState.timer2.toString(),
                score: {
                    cp1: this._gameState.cp1,
                    cp2: this._gameState.cp2,
                    turn: this._gameState.turn
                }
            };
            __WEBPACK_IMPORTED_MODULE_5_TinyServer_dist_esm_index__["a" /* TinyServerPlugin */].sendResponse({
                requestId: data.requestId,
                status: 200,
                body: JSON.stringify(json),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        else {
            __WEBPACK_IMPORTED_MODULE_5_TinyServer_dist_esm_index__["a" /* TinyServerPlugin */].sendResponse({
                requestId: data.requestId,
                status: 200,
                body: this.getPageHtml(),
                headers: {
                    'Content-Type': 'text/html'
                },
            });
        }
    };
    MyApp.prototype.getPageHtml = function () {
        return "\n    <!DOCTYPE html>\n    <html>\n      <head>\n        <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js\"></script>\n      </head>\n      <body>\n          <div id=\"turnInfo\">\n              <h2 id=\"turnInfoHeader\">\n                  <span class=\"turnLabel\">Turn:</span>\n                  <span id=\"turn\" class=\"turnText\"></span>\n              </h2>\n          </div>\n          <div id=\"leftPlayerInfo\">\n              <h2 id=\"leftPlayerHeader\">Left Player</h2>\n              <p class=\"timeInfo\">\n                  <span class=\"timeLabel\">Time:</span>\n                  <span id=\"leftPlayerTime\" class=\"timeText\"></span>\n              </p>\n              <p class=\"cpInfo\">\n                  <span class=\"cpLabel\">CP:</span>\n                  <span id=\"leftPlayerCP\" class=\"cpText\">0</span>\n              </p>\n          </div>\n          <div id=\"rightPlayerInfo\">\n              <h2 id=\"rightPlayerHeader\">Right Player</h2>\n              <p class=\"timeInfo\">\n                  <span class=\"timeLabel\">Time:</span>\n                  <span id=\"rightPlayerTime\" class=\"timeText\"></span>\n              </p>\n              <p class=\"cpInfo\">\n                  <span class=\"cpLabel\">CP:</span>\n                  <span id=\"rightPlayerCP\" class=\"cpText\">0</span>\n              </p>\n          </div>\n      </body>\n      <script>\n      var hostname = window.location.hostname;\n          function keepAlive() {\n              var timeout = 500;\n\n              $.getJSON(\n                  \"http://\" + hostname + \":8080/data\",\n                  function (json) {\n                      console.log(json);\n\n                      document.getElementById(\"turn\").innerText = json[\"score\"][\"turn\"];\n\n                      document.getElementById(\"leftPlayerTime\").innerText = json[\"timer1\"];\n                      document.getElementById(\"rightPlayerTime\").innerText = json[\"timer2\"];\n\n                      document.getElementById(\"leftPlayerCP\").innerText = json[\"score\"][\"cp1\"];\n                      document.getElementById(\"rightPlayerCP\").innerText = json[\"score\"][\"cp2\"];\n                  }\n              );\n\n              timerId = setTimeout(keepAlive, timeout);\n          };\n          keepAlive();\n      </script>\n    </html>\n    ";
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/Drew/Dev/Brutal Damage/ionic-game-clock/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/Drew/Dev/Brutal Damage/ionic-game-clock/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_4__providers_game_state_game_state__["a" /* GameStateProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Timer; });
var BASE_TICK_TIME = 100; // .1 second
var Timer = /** @class */ (function () {
    function Timer(name, preset) {
        this.name = name;
        this.preset = preset;
        this.time = 0; // milliseconds currently on the clock
        this.increment = 0; // milliseconds to increment the clock by after every move
        this.isTicking = false;
        this.isOutOfTime = false;
        this.setFromPreset(preset);
    }
    Timer.prototype.setFromPreset = function (preset) {
        this.time = 0;
        this.time += preset.minutes * 60000;
        this.time += preset.seconds * 1000;
        this.increment = preset.increment * 1000;
    };
    Timer.prototype.start = function () {
        this.isTicking = true;
        this.tick(BASE_TICK_TIME);
    };
    Timer.prototype.tick = function (tickTime) {
        var timer = this, actualTickTime;
        // Check to see if this timer is still ticking
        if (!timer.isTicking) {
            setTimeout(function () {
                // Calling $timeout strictly to have angular update the view
                console.log(timer.name + " stopped ticking with " + timer.time + " remaining");
            });
            return;
        }
        // See if there's any time left
        if (timer.time === 0) {
            // Set these booleans as quickly as possible to avoid possible misfire
            // of the controller's move() function
            timer.isTicking = false;
            timer.isOutOfTime = true;
            setTimeout(function () {
                // Calling $timeout strictly to have angular update the view
                console.log(timer.name + " ran out of time");
            });
            return;
        }
        // Tick off some time, but don't let the time drop below 0
        if (timer.time > tickTime) {
            timer.time -= tickTime;
            actualTickTime = tickTime;
        }
        else {
            // out of time, but it's possible that the player will make a move and
            // cause an increment before the end of a tick...
            timer.time = 0;
            actualTickTime = tickTime - timer.time;
            // adjust TICK_TIME here if optimization is needed
        }
        // Queue the view update and the next tick
        setTimeout(function () {
            //TODO: How big of an issue is that I'm growing the stack 10 times a second until the timer stops?
            timer.tick(tickTime);
        }, actualTickTime);
    };
    Timer.prototype.stop = function (isIncrementAllowed) {
        this.isTicking = false;
        if (isIncrementAllowed) {
            this.time += this.increment;
        }
        console.log("Stopping " + this.name + " with " + this.time + " remaining");
    };
    Timer.prototype.toString = function () {
        var t = this.time, h, m, s, decimal, output = "";
        // hours:
        h = Math.floor(t / 3600000);
        if (h > 0) {
            output += h + ":";
            t -= h * 3600000; // don't include this time in the minutes count
        }
        // minutes:
        m = Math.floor(t / 60000);
        if (!output) {
            // no hours to show
            if (m > 0) {
                output += m;
            }
        }
        else {
            if (m < 10) {
                // display the leading 0
                output += "0";
            }
            output += m;
        }
        t -= m * 60000; // don't include this time into the seconds count
        // seconds:
        s = Math.floor(t / 1000);
        if (!output) {
            // It is down to just the seconds
            if (s < 10) {
                // less than 10 seconds left: show the decimals
                // capture the remaining time down to the tenth
                decimal = Math.floor((t - (s * 1000)) / 100);
                output += s + "." + decimal;
            }
            else {
                output += ":" + s;
            }
        }
        else {
            // append to the minutes
            if (s < 10) {
                output += ":0" + s;
            }
            else {
                output += ":" + s;
            }
        }
        return output;
    };
    ;
    return Timer;
}());

//# sourceMappingURL=Timer.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimerPreset; });
var TimerPreset = /** @class */ (function () {
    function TimerPreset(options) {
        this.name = options.name;
        this.minutes = options.minutes;
        this.seconds = options.seconds;
        this.increment = options.increment;
    }
    return TimerPreset;
}());

//# sourceMappingURL=TimerPreset.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameStateProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logic_Timer__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logic_TimerPreset__ = __webpack_require__(276);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



/*
  Generated class for the GameStateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var GameStateProvider = /** @class */ (function () {
    function GameStateProvider() {
        this._turnCounter = 1;
        this._cp1 = 0;
        this._cp2 = 0;
        this._currentGameSetting = 3;
        this.gameSettings = [
            new __WEBPACK_IMPORTED_MODULE_2__logic_TimerPreset__["a" /* TimerPreset */]({
                name: "20 minutes",
                minutes: 20,
                seconds: 0,
                increment: 1
            }),
            new __WEBPACK_IMPORTED_MODULE_2__logic_TimerPreset__["a" /* TimerPreset */]({
                name: "30 minutes",
                minutes: 30,
                seconds: 0,
                increment: 1
            }),
            new __WEBPACK_IMPORTED_MODULE_2__logic_TimerPreset__["a" /* TimerPreset */]({
                name: "40 minutes",
                minutes: 43,
                seconds: 0,
                increment: 1
            }),
            new __WEBPACK_IMPORTED_MODULE_2__logic_TimerPreset__["a" /* TimerPreset */]({
                name: "60 minutes",
                minutes: 60,
                seconds: 0,
                increment: 1
            }),
            new __WEBPACK_IMPORTED_MODULE_2__logic_TimerPreset__["a" /* TimerPreset */]({
                name: "75 minutes",
                minutes: 75,
                seconds: 0,
                increment: 1
            }),
            new __WEBPACK_IMPORTED_MODULE_2__logic_TimerPreset__["a" /* TimerPreset */]({
                name: "120 minutes",
                minutes: 120,
                seconds: 0,
                increment: 1
            }),
            new __WEBPACK_IMPORTED_MODULE_2__logic_TimerPreset__["a" /* TimerPreset */]({
                name: "150 minutes",
                minutes: 150,
                seconds: 0,
                increment: 1
            })
        ];
        this.timer1 = new __WEBPACK_IMPORTED_MODULE_1__logic_Timer__["a" /* Timer */]("Timer 1", this.gameSettings[3]);
        this.timer2 = new __WEBPACK_IMPORTED_MODULE_1__logic_Timer__["a" /* Timer */]("Timer 2", this.gameSettings[3]);
        this.nextToMove = this.timer1;
    }
    Object.defineProperty(GameStateProvider.prototype, "turn", {
        get: function () {
            var temp = this._turnCounter / 2;
            var isBTurn = Number.isInteger(temp);
            var whole = Math.ceil(temp);
            if (whole < 1)
                return "1A";
            return "" + whole + (isBTurn ? "B" : "A");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameStateProvider.prototype, "cp1", {
        get: function () {
            return this._cp1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameStateProvider.prototype, "cp2", {
        get: function () {
            return this._cp2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameStateProvider.prototype, "currentGameSetting", {
        get: function () {
            return this._currentGameSetting;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameStateProvider.prototype, "gameStarted", {
        get: function () {
            return this._gameStarted;
        },
        enumerable: true,
        configurable: true
    });
    GameStateProvider.prototype.updateClockSettings = function (settingsIndex) {
        this._currentGameSetting = settingsIndex;
        this.timer1.setFromPreset(this.gameSettings[settingsIndex]);
        this.timer2.setFromPreset(this.gameSettings[settingsIndex]);
    };
    GameStateProvider.prototype.resetGameState = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._gameStarted = false;
                this.timer1.stop(false);
                this.timer2.stop(false);
                this.timer1.isOutOfTime = false;
                this.timer2.isOutOfTime = false;
                this.updateClockSettings(this.currentGameSetting);
                this.nextToMove = this.timer1;
                this._turnCounter = 1;
                this._cp1 = 0;
                this._cp2 = 0;
                return [2 /*return*/];
            });
        });
    };
    GameStateProvider.prototype.togglePause = function (isForcedStop) {
        if (this.timer1.isTicking) {
            console.log("Pausing " + this.timer1.name);
            this.timer1.stop(false);
            this.nextToMove = this.timer1;
        }
        else if (this.timer2.isTicking) {
            console.log("Pausing " + this.timer2.name);
            this.timer2.stop(false);
            this.nextToMove = this.timer2;
        }
        else if (this.timer1.isOutOfTime || this.timer2.isOutOfTime) {
            this.resetGameState();
        }
        else if (!isForcedStop) {
            this.nextToMove.start();
            this.nextToMove = null;
        }
    };
    ;
    GameStateProvider.prototype.move = function () {
        this._gameStarted = true;
        if (this.timer1.isTicking) {
            this.timer1.stop(true);
            this.timer2.start();
        }
        else if (this.timer2.isTicking) {
            this.timer2.stop(true);
            this.timer1.start();
        }
        else if (!this.timer1.isOutOfTime && !this.timer2.isOutOfTime) {
            // Make the first move
            this.nextToMove.start();
            this.nextToMove = null;
        }
    };
    GameStateProvider.prototype.start = function (timerIndex) {
        if (timerIndex == 0)
            this.nextToMove = this.timer1;
        else if (timerIndex == 1)
            this.nextToMove = this.timer2;
        this.move();
    };
    GameStateProvider.prototype.incrementTurn = function () {
        this._turnCounter++;
    };
    GameStateProvider.prototype.decrementTurn = function () {
        if (this._turnCounter > 1)
            this._turnCounter--;
    };
    GameStateProvider.prototype.incrementCP = function (playerIndex) {
        if (playerIndex == 0)
            this._cp1++;
        else if (playerIndex == 1)
            this._cp2++;
    };
    GameStateProvider.prototype.decrementCP = function (playerIndex) {
        if (playerIndex == 0 && this._cp1 > 0)
            this._cp1--;
        else if (playerIndex == 1 && this._cp2 > 0)
            this._cp2--;
    };
    GameStateProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], GameStateProvider);
    return GameStateProvider;
}());

//# sourceMappingURL=game-state.js.map

/***/ })

},[201]);
//# sourceMappingURL=main.js.map