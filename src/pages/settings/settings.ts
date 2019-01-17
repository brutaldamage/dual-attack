import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { GameStateProvider } from '../../providers/game-state/game-state';

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

  constructor(public viewCtrl: ViewController,  private gameState: GameStateProvider) {
    this.gameType = gameState.currentGameSetting;
  }

  onSelectChange(selectedValue: number) {
    this.gameType = selectedValue;
    this.gameState.updateClockSettings(selectedValue)
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
