import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { SettingsProvider } from './../../providers/settings/settings';
import { GameStateProvider } from '../../providers/game-state/game-state';
import { Plugins } from '@capacitor/core';


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

  selectedTheme: String;
  gameType: number;
  hours: number;
  minutes: number;

  constructor(public viewCtrl: ViewController, private gameState: GameStateProvider, private settings: SettingsProvider) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.gameType = gameState.currentGameSetting;

    let totalMinutes = this.gameState.timer1.presetMinutes;
    let h = Math.floor(totalMinutes / 60);
    let m = totalMinutes % 60;

    this.hours = h;
    this.minutes = m;
  }

  async onHoursChanged(selectedValue: number) {
    this.gameState.updateClockSettings(parseInt(this.hours.toString()), parseInt(this.minutes.toString()));
  }

  async onMinutesChanged(selectedValue: number) {
    this.gameState.updateClockSettings(parseInt(this.hours.toString()), parseInt(this.minutes.toString()));
  }

  toggleAppTheme() {
    if (this.selectedTheme === 'dark-theme') {
      this.settings.setActiveTheme('light-theme');
    } else {
      this.settings.setActiveTheme('dark-theme');
    }
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
