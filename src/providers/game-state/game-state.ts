import { Injectable } from '@angular/core';

import { Timer } from '../../_logic/Timer';
import { TimerPreset } from '../../_logic/TimerPreset';

/*
  Generated class for the GameStateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GameStateProvider {

  private nextToMove: Timer;

  private _turnCounter: number = 1;
  private _cp1: number = 0;
  private _cp2: number = 0;

  get turn(): string {
    var temp = this._turnCounter / 2;
    var isBTurn = Number.isInteger(temp);

    var whole = Math.ceil(temp);

    if (whole < 1)
      return "1A";

    return `${whole}${isBTurn ? "B" : "A"}`;
  }

  get cp1(): number {
    return this._cp1;
  }

  get cp2(): number {
    return this._cp2;
  }

  private _currentGameSetting: number = 3;
  get currentGameSetting(): number {
    return this._currentGameSetting;
  }

  private gameSettings: TimerPreset[];

  public timer1: Timer;
  public timer2: Timer;

  private _gameStarted;
  get gameStarted(): boolean {
    return this._gameStarted;
  }

  constructor() {

    this.gameSettings = [
      new TimerPreset({
        name: "20 minutes",
        minutes: 20,
        seconds: 0,
        increment: 1
      }),
      new TimerPreset({
        name: "30 minutes",
        minutes: 30,
        seconds: 0,
        increment: 1
      }),
      new TimerPreset({
        name: "40 minutes",
        minutes: 43,
        seconds: 0,
        increment: 1
      }),
      new TimerPreset({
        name: "60 minutes",
        minutes: 60,
        seconds: 0,
        increment: 1
      }),
      new TimerPreset({
        name: "75 minutes",
        minutes: 75,
        seconds: 0,
        increment: 1
      }),
      new TimerPreset({
        name: "120 minutes",
        minutes: 120,
        seconds: 0,
        increment: 1
      }),
      new TimerPreset({
        name: "150 minutes",
        minutes: 150,
        seconds: 0,
        increment: 1
      })
    ];

    this.timer1 = new Timer("Timer 1", this.gameSettings[3]);
    this.timer2 = new Timer("Timer 2", this.gameSettings[3]);
    this.nextToMove = this.timer1;
  }

  updateClockSettings(settingsIndex: number) {
    this._currentGameSetting = settingsIndex;
    this.timer1.setFromPreset(this.gameSettings[settingsIndex]);
    this.timer2.setFromPreset(this.gameSettings[settingsIndex]);
  }

  async resetGameState() {
    this._gameStarted = false;
    this.timer1.stop(false);
    this.timer2.stop(false);
    this.timer1.isOutOfTime = false;
    this.timer2.isOutOfTime = false;
    this.updateClockSettings(this.currentGameSetting);
    this.nextToMove = this.timer1;
    this._turnCounter = 1;
    this._cp1 = 0;
    this._cp2 = 0;
  }

  togglePause(isForcedStop: boolean) {
    if (this.timer1.isTicking) {
      console.log("Pausing " + this.timer1.name);
      this.timer1.stop(false);
      this.nextToMove = this.timer1;
    } else if (this.timer2.isTicking) {
      console.log("Pausing " + this.timer2.name);
      this.timer2.stop(false);
      this.nextToMove = this.timer2;
    } else if (this.timer1.isOutOfTime || this.timer2.isOutOfTime) {
      this.resetGameState();
    } else if (!isForcedStop) {
      this.nextToMove.start();
      this.nextToMove = null;
    }
  };

  move() {
    this._gameStarted = true;

    if (this.timer1.isTicking) {
      this.timer1.stop(true);
      this.timer2.start();
    }
    else if (this.timer2.isTicking) {
      this.timer2.stop(true);
      this.timer1.start();
    }
    else if (!this.timer1.isOutOfTime && !this.timer2.isOutOfTime) {
      // Make the first move
      this.nextToMove.start();
      this.nextToMove = null;
    }
  }

  start(timerIndex: number) {
    if (timerIndex == 0)
      this.nextToMove = this.timer1;
    else if (timerIndex == 1)
      this.nextToMove = this.timer2;

    this.move();
  }

  incrementTurn() {
    if(this._turnCounter < 14)
      this._turnCounter++;
  }

  decrementTurn() {
    if (this._turnCounter > 1)
      this._turnCounter--;
  }

  incrementCP(playerIndex: number) {

    if(this._turnCounter < 4)
      return;

    if (playerIndex == 0)
      this._cp1++;
    else if (playerIndex == 1)
      this._cp2++;
  }

  decrementCP(playerIndex: number) {

    if(this._turnCounter < 4)
      return;

    if (playerIndex == 0 && this._cp1 > 0)
      this._cp1--;
    else if (playerIndex == 1 && this._cp2 > 0)
      this._cp2--;
  }
}
