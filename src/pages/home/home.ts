import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Plugins } from '@capacitor/core';
import { NetworkInterface } from '@ionic-native/network-interface';
const { Modals } = Plugins;

const BASE_TICK_TIME = 100; // .1 second
declare var webserver: any;
declare var networkinterface;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private nextToMove: Timer;

  public setting1: TimerPreset;
  public setting2: TimerPreset;

  public timer1: Timer;
  public timer2: Timer;

  private _gameStarted;
  get gameStarted(): boolean {
    return this._gameStarted;
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

    let ipAddress: string = "localhost";

    // webserver is only available on cordova
    if (this.platform.is('cordova')) {
      webserver.onRequest((request) => {
        console.log("O MA GAWD! This is the request: ", request);

        var json = {
          timer1: this.timer1,
          timer2: this.timer2
        }

        webserver.sendResponse(
          request.requestId,
          {
            status: 200,
            body: JSON.stringify(json),
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      }
      );

      webserver.start();
      var networkinfo = await this.network.getWiFiIPAddress();
      ipAddress = networkinfo.ip;
    }

    Modals.alert({
      title: "Server Info",
      message: `http://${ipAddress}:8080`
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
    return "Resume";
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
}

export class TimerPreset {
  name: string;
  minutes: number;
  seconds: number;
  increment: number;

  constructor(options: any) {
    this.name = options.name;
    this.minutes = options.minutes;
    this.seconds = options.seconds;
    this.increment = options.increment;
  }
}

export class Timer {
  time: number;
  increment: number;
  isTicking: boolean;
  isOutOfTime: boolean;

  constructor(public name: string, private preset: any) {
    this.time = 0; // milliseconds currently on the clock
    this.increment = 0; // milliseconds to increment the clock by after every move
    this.isTicking = false;
    this.isOutOfTime = false;

    this.setFromPreset(preset);
  }

  setFromPreset(preset: any) {
    this.time = 0;
    this.time += preset.minutes * 60000;
    this.time += preset.seconds * 1000;
    this.increment = preset.increment * 1000;
  }

  start() {
    this.isTicking = true;
    this.tick(BASE_TICK_TIME);
  }

  tick(tickTime: number) {
    var timer = this,
      actualTickTime;

    // Check to see if this timer is still ticking
    if (!timer.isTicking) {
      setTimeout(() => {
        // Calling $timeout strictly to have angular update the view
        console.log(timer.name + " stopped ticking with " + timer.time + " remaining");
      });
      return;
    }

    // See if there's any time left
    if (timer.time === 0) {
      // Set these booleans as quickly as possible to avoid possible misfire
      // of the controller's move() function
      timer.isTicking = false;
      timer.isOutOfTime = true;
      setTimeout(() => {
        // Calling $timeout strictly to have angular update the view
        console.log(timer.name + " ran out of time");
      });
      return;
    }

    // Tick off some time, but don't let the time drop below 0
    if (timer.time > tickTime) {
      timer.time -= tickTime;
      actualTickTime = tickTime;
    } else {
      // out of time, but it's possible that the player will make a move and
      // cause an increment before the end of a tick...
      timer.time = 0;
      actualTickTime = tickTime - timer.time;
      // adjust TICK_TIME here if optimization is needed
    }

    // Queue the view update and the next tick
    setTimeout(() => {
      //TODO: How big of an issue is that I'm growing the stack 10 times a second until the timer stops?
      timer.tick(tickTime);
    }, actualTickTime);
  }

  stop(isIncrementAllowed: boolean) {
    this.isTicking = false;
    if (isIncrementAllowed) {
      this.time += this.increment;
    }
    console.log("Stopping " + this.name + " with " + this.time + " remaining");
  }

  toString() {
    var t = this.time, h, m, s, decimal,
      output = "";

    // hours:
    h = Math.floor(t / 3600000);
    if (h > 0) {
      output += h + ":";
      t -= h * 3600000; // don't include this time in the minutes count
    }

    // minutes:
    m = Math.floor(t / 60000);
    if (!output) {
      // no hours to show
      if (m > 0) {
        output += m;
      }
    } else {
      if (m < 10) {
        // display the leading 0
        output += "0";
      }
      output += m;
    }
    t -= m * 60000; // don't include this time into the seconds count

    // seconds:
    s = Math.floor(t / 1000);
    if (!output) {
      // It is down to just the seconds
      if (s < 10) {
        // less than 10 seconds left: show the decimals
        // capture the remaining time down to the tenth
        decimal = Math.floor((t - (s * 1000)) / 100);
        output += s + "." + decimal;
      } else {
        output += ":" + s;
      }
    } else {
      // append to the minutes
      if (s < 10) {
        output += ":0" + s;
      } else {
        output += ":" + s;
      }
    }

    return output;
  };
}