import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { GameStateProvider } from '../game-state/game-state'
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

  constructor(private gameState: GameStateProvider) {
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
        status: 200,
        body: this.getPageHtml(),
        headers: {
          'Content-Type': 'text/html'
        },
      });
    }
  }

  private getPageHtml(): string {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
      </head>
      <body>
          <div id="turnInfo">
              <h2 id="turnInfoHeader">
                  <span class="turnLabel">Turn:</span>
                  <span id="turn" class="turnText"></span>
              </h2>
          </div>
          <div id="leftPlayerInfo">
              <h2 id="leftPlayerHeader">Left Player</h2>
              <p class="timeInfo">
                  <span class="timeLabel">Time:</span>
                  <span id="leftPlayerTime" class="timeText"></span>
              </p>
              <p class="cpInfo">
                  <span class="cpLabel">CP:</span>
                  <span id="leftPlayerCP" class="cpText">0</span>
              </p>
          </div>
          <div id="rightPlayerInfo">
              <h2 id="rightPlayerHeader">Right Player</h2>
              <p class="timeInfo">
                  <span class="timeLabel">Time:</span>
                  <span id="rightPlayerTime" class="timeText"></span>
              </p>
              <p class="cpInfo">
                  <span class="cpLabel">CP:</span>
                  <span id="rightPlayerCP" class="cpText">0</span>
              </p>
          </div>
      </body>
      <script>
      var hostname = window.location.hostname;
          function keepAlive() {
              var timeout = 500;

              $.getJSON(
                  "http://" + hostname + ":8080/data",
                  function (json) {
                      console.log(json);

                      document.getElementById("turn").innerText = json["score"]["turn"];

                      document.getElementById("leftPlayerTime").innerText = json["timer1"];
                      document.getElementById("rightPlayerTime").innerText = json["timer2"];

                      document.getElementById("leftPlayerCP").innerText = json["score"]["cp1"];
                      document.getElementById("rightPlayerCP").innerText = json["score"]["cp2"];
                  }
              );

              timerId = setTimeout(keepAlive, timeout);
          };
          keepAlive();
      </script>
    </html>
    `;
  }
}
