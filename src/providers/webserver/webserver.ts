import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { GameStateProvider } from '../game-state/game-state'
import { HttpClient } from '@angular/common/http';
import { WebServerPlugin, WebServerRequest } from '../../native/webserver';
const { WebServerPlugin, App, Storage } = Plugins
/*
  Generated class for the WebserverProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WebserverProvider {
  private _gameState: GameStateProvider;

  constructor(private gameState: GameStateProvider, private http: HttpClient) {
    this._gameState = gameState;
  }

  async startWebServer(): Promise<boolean> {
    let enabled = await Storage.get({ key: "serverEnabled" });

    if (JSON.parse(enabled.value) == true) {
      await WebServerPlugin.startServer();
      WebServerPlugin.addListener("httpRequestReceived", (info: any) => {
        this.handleOnRequest(info);
      });

      return true;
    }

    return false;
  }

  async stopWebServer(): Promise<boolean> {
    if ((await WebServerPlugin.isRunning()).isRunning) {
      await WebServerPlugin.stopServer();

      return true;
    }

    return false;
  }

  private async handleOnRequest(data: WebServerRequest) {
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
      let htmlContent = await this.getPageHtml();
      WebServerPlugin.sendResponse({
        requestId: data.requestId,
        status: 200,
        body: htmlContent,
        headers: {
          'Content-Type': 'text/html'
        },
      });
    }
  }

  private async getPageHtml(): Promise<string> {
    let httpResult = await this.http
      .get("assets/static/server.html", { responseType: "text" })
      .toPromise();

    let httpString = httpResult.toString();

    return httpString;
  }
}
