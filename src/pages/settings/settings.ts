import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
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

  private _darkTheme: Boolean;

  get darkTheme(): Boolean {
    return this._darkTheme;
  }

  set darkTheme(value: Boolean) {
    this._darkTheme = value;
  }

  gameType: number;

  constructor(public viewCtrl: ViewController, private gameState: GameStateProvider) {
    this.gameType = gameState.currentGameSetting;

    Plugins.Storage.get({ key: "darkTheme" })
      .then(value => {
        this._darkTheme = (value.value === "true");
      });
  }

  onSelectChange(selectedValue: number) {
    this.gameType = selectedValue;
    this.gameState.updateClockSettings(selectedValue)
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
