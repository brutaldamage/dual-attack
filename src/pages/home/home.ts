import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Plugins, CallbackID } from '@capacitor/core';
import { NetworkInterface } from '@ionic-native/network-interface';
import { Timer } from '../../_logic/Timer';
import { TimerPreset } from '../../_logic/TimerPreset';
import { WebServerPlugin, WebServerRequest } from '../../webserver/webserver';
const { Modals, WebServerPlugin } = Plugins;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private _turnCounter: number = 1;
  private _cp1: number = 0;
  private _cp2: number = 0;

  private nextToMove: Timer;

  public setting1: TimerPreset;
  public setting2: TimerPreset;

  public timer1: Timer;
  public timer2: Timer;

  private _gameStarted;
  get gameStarted(): boolean {
    return this._gameStarted;
  }

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

  constructor(public navCtrl: NavController, private platform: Platform, private network: NetworkInterface) {
    this.setting1 = new TimerPreset({
      name: "75 Points",
      minutes: 60,
      seconds: 0,
      increment: 1
    });
    this.setting2 = new TimerPreset({
      name: "35 Points",
      minutes: 45,
      seconds: 0,
      increment: 1
    });

    this.timer1 = new Timer("75 Points", this.setting1);
    this.timer2 = new Timer("75 Points", this.setting1);
    this.nextToMove = this.timer1;
  }

  updateClockSettings() {
    this.timer1.setFromPreset(this.setting1);
    this.timer2.setFromPreset(this.setting1);
  }

  async startServer() {
    await WebServerPlugin.startServer();

    WebServerPlugin.onRequest((data: WebServerRequest) => {

      if (data.path.includes("data")) {
        var json = {
          timer1: this.timer1.toString(),
          timer2: this.timer2.toString(),
          score: {
            cp1: this._cp1,
            cp2: this._cp2,
            turn: this.turn
          }
        };

        WebServerPlugin.sendResponse({
          requestId: data.requestId,
          status: 200,
          body: JSON.stringify(json),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      else 
      {
        WebServerPlugin.sendResponse({
          requestId: data.requestId,
          body: "",
          headers: {},
          status: 404
        });
      }
    });
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
      this._gameStarted = false;
      this.timer1.stop(false);
      this.timer2.stop(false);
      this.timer1.isOutOfTime = false;
      this.timer2.isOutOfTime = false;
      this.updateClockSettings();
      this.nextToMove = this.timer1;
      this._turnCounter = 1;
      this._cp1 = 0;
      this._cp2 = 0;
    }
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
      this.reset();
    } else if (!isForcedStop) {
      this.nextToMove.start();
      this.nextToMove = null;
    }
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
    this._turnCounter++;
  }

  decrementTurn() {
    if (this._turnCounter > 1)
      this._turnCounter--;
  }

  incrementCP(playerIndex: number) {
    if (playerIndex == 0)
      this._cp1++;
    else if (playerIndex == 1)
      this._cp2++;
  }

  decrementCP(playerIndex: number) {
    if (playerIndex == 0 && this._cp1 > 0)
      this._cp1--;
    else if (playerIndex == 1 && this._cp2 > 0)
      this._cp2--;
  }
}