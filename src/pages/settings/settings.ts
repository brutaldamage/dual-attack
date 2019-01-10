import { Component } from '@angular/core';
import { ViewController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GameStateProvider } from '../../providers/game-state/game-state';
import { WebServerPlugin } from '../../native/webserver';
import { Plugins } from '@capacitor/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  gameType: number;
  serverEnabledSetting: boolean;

  private _serverAddress: string;

  get serverAddress(): string {
    return this._serverAddress;
  }

  get serverAvailable(): boolean {
    return true;
    // return this.platform.is('cordova');
  }

  get showServerAddress(): boolean {
    return this.serverEnabledSetting;
  }

  constructor(public viewCtrl: ViewController, private platform: Platform, private storage: Storage, private gameState: GameStateProvider) {
    this.gameType = gameState.currentGameSetting;

    if (this.serverAvailable) {
      this.loadServerSettings();
    }
  }

  onSelectChange(selectedValue: number) {
    this.gameType = selectedValue;
    this.gameState.updateClockSettings(selectedValue)
  }

  async loadServerSettings() {
    let value = await this.storage.get('serverEnabled');
    if(value === "true") {
      this._serverAddress = (await Plugins.WebServerPlugin.getURL()).url;
      this.serverEnabledSetting = true;
    }
    else {
      this.serverEnabledSetting = false;
    }
  }

  async onToggleChanged($event: any) {
    console.log($event)

    let checked = $event.checked as boolean;

    if (checked) {
      await Plugins.WebServerPlugin.startServer();
    }
    else {
      await Plugins.WebServerPlugin.stopServer();
    }

    this.storage.set('serverEnabled', checked ? "true" : "false");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
