import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Plugins, CallbackID } from '@capacitor/core';
import { NetworkInterface } from '@ionic-native/network-interface';
import { Timer } from '../../_logic/Timer';
import { TimerPreset } from '../../_logic/TimerPreset';

import { GameStateProvider } from '../../providers/game-state/game-state';
const { Modals, WebServerPlugin } = Plugins;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

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

  constructor(public navCtrl: NavController, private platform: Platform, private network: NetworkInterface, private gameState: GameStateProvider) {
   
  }

  updateClockSettings() {
    this.gameState.updateClockSettings();
  }

  async startServer() {

    var url = await WebServerPlugin.getURL();
    console.log(url);

    await Modals.alert({
      title: "Web Server Url",
      message: url.url
    })
  }

  showSettings() {
    // this.togglePause(true);
    // todo: show modal
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