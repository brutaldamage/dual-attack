import { Injectable } from '@angular/core';

import { Timer } from '../../_logic/Timer';
import { TimerPreset } from '../../_logic/TimerPreset';
import { Plugins } from '@capacitor/core';

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

  private _timerPreset: TimerPreset;

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

  public timer1: Timer;
  public timer2: Timer;

  private _gameStarted;
  get gameStarted(): boolean {
    return this._gameStarted;
  }

  constructor() {

    this._timerPreset = new TimerPreset({
      name: "60 minutes",
      minutes: 60,
      seconds: 0
    });

    this.timer1 = new Timer("Timer 1", this._timerPreset);
    this.timer2 = new Timer("Timer 2", this._timerPreset);
    this.nextToMove = this.timer1;

    Plugins.Storage.get({ key: "timerPreset" })
      .then(value => {
        if (value.value) {
          let totalMinutes = parseInt(value.value);
          let h = Math.floor(totalMinutes / 60);
          let m = totalMinutes % 60;

          this.updateClockSettings(h, m);
        }
      });
  }

  updateClockSettings(hour: number, minutes: number) {

    let totalMinutes = minutes;
    if (hour > 0)
      totalMinutes += (hour * 60);

    this._timerPreset = new TimerPreset({
      name: "Custom Clock",
      minutes: totalMinutes,
      seconds: 0
    })

    this.restoreTimerPreset();
  }

  updateTimer1Time(newValue: TimerPreset) {
    this.timer1.stop();
    this.timer1.setFromPreset(newValue);
  }

  updateTimer2Time(newValue: TimerPreset) {
    this.timer2.stop();
    this.timer2.setFromPreset(newValue);
  }

  private restoreTimerPreset() {
    this.timer1.setFromPreset(this._timerPreset);
    this.timer2.setFromPreset(this._timerPreset);

    Plugins.Storage.set({ key: "timerPreset", value: this._timerPreset.minutes.toString() });
  }

  async resetGameState() {
    this._gameStarted = false;
    this.timer1.stop();
    this.timer2.stop();
    this.timer1.isOutOfTime = false;
    this.timer2.isOutOfTime = false;
    this.restoreTimerPreset();
    this.nextToMove = this.timer1;
    this._turnCounter = 1;
    this._cp1 = 0;
    this._cp2 = 0;
  }

  togglePause(isForcedStop: boolean) {
    if (this.timer1.isTicking) {
      console.log("Pausing " + this.timer1.name);
      this.timer1.stop();
      this.nextToMove = this.timer1;
    } else if (this.timer2.isTicking) {
      console.log("Pausing " + this.timer2.name);
      this.timer2.stop();
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
      this.timer1.stop();
      this.timer2.start();
    }
    else if (this.timer2.isTicking) {
      this.timer2.stop();
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
    if (this._turnCounter < 14)
      this._turnCounter++;
  }

  decrementTurn() {
    if (this._turnCounter > 1)
      this._turnCounter--;
  }

  incrementCP(playerIndex: number) {

    if (this._turnCounter < 3)
      return;

    if (playerIndex == 0)
      this._cp1++;
    else if (playerIndex == 1)
      this._cp2++;
  }

  decrementCP(playerIndex: number) {

    if (this._turnCounter < 3)
      return;

    if (playerIndex == 0 && this._cp1 > 0)
      this._cp1--;
    else if (playerIndex == 1 && this._cp2 > 0)
      this._cp2--;
  }

  getBundle(): any {
    return {
      turnCounter: this._turnCounter,
      cp1: this._cp1,
      cp2: this._cp2,
      timer1: this.timer1.getBundle(),
      timer2: this.timer2.getBundle(),
      timerPreset: {
        name: this._timerPreset.name,
        minutes: this._timerPreset.minutes,
        seconds: this._timerPreset.seconds
      }
    }
  }

  restoreBundle(bundle: any) {
    console.log("restore game state: ");
    console.log(JSON.stringify(bundle));
    this._turnCounter = bundle.turnCounter;
    this._cp1 = bundle.cp1;
    this._cp2 = bundle.cp2;
    this.timer1.restoreBundle(bundle.timer1);
    this.timer2.restoreBundle(bundle.timer2);

    this._timerPreset = new TimerPreset(bundle.timerPreset);
  }
}
