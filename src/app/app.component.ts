import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Plugins, AppState } from '@capacitor/core';
import { GameStateProvider } from '../providers/game-state/game-state';
import { WebserverProvider } from '../providers/webserver/webserver'
import { HomePage } from '../pages/home/home';

const { App, Storage } = Plugins

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  private _gameState: GameStateProvider;

  rootPage: any = HomePage;

  constructor(platform: Platform, gameState: GameStateProvider, private webServerProvider: WebserverProvider) {
    this._gameState = gameState;
    platform.ready().then(() => {

      if (platform.is('cordova')) {
        Plugins.StatusBar.hide();
        webServerProvider.startWebServer();

        App.addListener('appStateChange', async (state: AppState) => {
          if (!state.isActive) {
            gameState.togglePause(true);
            let bundle = gameState.getBundle();
            await Storage.set({ key: 'appState', value: JSON.stringify(bundle) });
          }
          else {
            let appState = await Storage.get({ key: 'appState' });
            if (appState && appState.value) {
              this._gameState.restoreBundle(JSON.parse(appState.value));
            }
          }
        });
      }
    });
  }
}