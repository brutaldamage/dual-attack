import { Component } from '@angular/core';
import { ViewController, Platform } from 'ionic-angular';
import { GameStateProvider } from '../../providers/game-state/game-state';
import { Plugins } from '@capacitor/core';
const { WebServerPlugin, Storage } = Plugins

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
  hours: number;
  minutes: number;

  serverEnabledSetting: boolean;

  private _serverAddress: string;

  get serverAvailable(): boolean {
    return true;
    // return this.platform.is('cordova');
  }

  constructor(public viewCtrl: ViewController, private platform: Platform, private gameState: GameStateProvider) {
    this.gameType = gameState.currentGameSetting;

    let totalMinutes = this.gameState.timer1.presetMinutes;
    let h = Math.floor(totalMinutes / 60);
    let m = totalMinutes % 60;

    this.hours = h;
    this.minutes = m;

    if (this.serverAvailable) {
      this.loadServerSettings();
    }
  }

  async onHoursChanged(selectedValue: number) {
    this.gameState.updateClockSettings(parseInt(this.hours.toString()), parseInt(this.minutes.toString()));
  }

  async onMinutesChanged(selectedValue: number) {
    this.gameState.updateClockSettings(parseInt(this.hours.toString()), parseInt(this.minutes.toString()));
  }

  async loadServerSettings() {
    let enabled = await Storage.get({ key: "serverEnabled" });

    this.serverEnabledSetting = enabled.value === "true";
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

    let kvp = { key: "serverEnabled", value: checked ? "true" : "false" };
    console.log("Setting server enabled:");
    console.log(kvp);
    Storage.set(kvp);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  async onBrutalDamageLinkClicked() {
    await Plugins.Browser.open({ url: 'http://brutaldamage.blog' });
  }

  async onGithubLinkClicked() {
    await Plugins.Browser.open({ url: 'https://github.com/brutaldamage/dual-attack' });
  }
}