import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Plugins } from '@capacitor/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GameStateProvider } from '../providers/game-state/game-state';
import { WebServerPlugin, WebServerRequest } from '../webserver/webserver';
const { WebServerPlugin } = Plugins;

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  private _gameState: GameStateProvider;

  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, gameState: GameStateProvider) {
    this._gameState = gameState;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      WebServerPlugin.startServer().then(() => {
        WebServerPlugin.onRequest((data: WebServerRequest) => this.handleOnRequest(data));
      });
    });
  }

  private handleOnRequest(data: WebServerRequest) {
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

      WebServerPlugin.sendResponse({
        requestId: data.requestId,
        status: 200,
        body: JSON.stringify(json),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    else {
      WebServerPlugin.sendResponse({
        requestId: data.requestId,
        body: "",
        headers: {},
        status: 404
      });
    }
  }
}