import { Component } from '@angular/core';
import { NavController, ModalController, Platform } from 'ionic-angular';
import { Plugins, CallbackID } from '@capacitor/core';
import { Timer } from '../../_logic/Timer';
import { WebServerPlugin, WebServerRequest } from '../../native/webserver';

import { GameStateProvider } from '../../providers/game-state/game-state';
import { SettingsProvider } from '../../providers/settings/settings';
import { SettingsPage } from '../settings/settings';
const { Modals, WebServerPlugin } = Plugins;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  get serverSettingsAvailable(): Boolean {
    return this.platform.is('cordova');
  }

  get turn(): string {
    return this.gameState.turn;
  }

  get timer1(): Timer {
    return this.gameState.timer1;
  }

  get timer2(): Timer {
    return this.gameState.timer2;
  }

  get gameStarted(): boolean {
    return this.gameState.gameStarted;
  }

  get cp1(): number {
    return this.gameState.cp1;
  }

  get cp2(): number {
    return this.gameState.cp2;
  }

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private platform: Platform, private gameState: GameStateProvider, private settings: SettingsProvider) {
  }

  async showServerSettings() {
    var url = await WebServerPlugin.getURL();
    console.log(url);

    await Modals.alert({
      title: "Web Server Url",
      message: url.url
    })
  }

  async showSettings() {

    let profileModal = this.modalCtrl.create(SettingsPage);
    profileModal.present();
  }

  async reset() {
    var confirmResult = await Modals.confirm({
      title: "Reset Game",
      message: "Are you sure you want to reset this game?",
      okButtonTitle: "Yes",
      cancelButtonTitle: "No"
    });

    if (confirmResult.value) {
      this.gameState.resetGameState();
    }
  }

  togglePause(isForcedStop: boolean) {
    this.gameState.togglePause(isForcedStop);
  };

  actionLabel(): string {
    if (this.timer1.isTicking || this.timer2.isTicking) {
      return "Pause";
    }
    if (this.timer1.isOutOfTime || this.timer2.isOutOfTime) {
      return "Reset";
    }

    return this.gameStarted ? "Resume" : "Start";
  };

  move() {
    this.gameState.move();
  }

  start(timerIndex: number) {
    this.gameState.start(timerIndex);
  }

  incrementTurn() {
    this.gameState.incrementTurn();
  }

  decrementTurn() {
    this.gameState.decrementTurn();
  }

  incrementCP(playerIndex: number) {
    this.gameState.incrementCP(playerIndex);
  }

  decrementCP(playerIndex: number) {
    this.gameState.decrementCP(playerIndex);
  }
}