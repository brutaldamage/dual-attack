import { Component } from '@angular/core';
import { ViewController, Platform } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameStateProvider } from '../../providers/game-state/game-state';
import { TimerPreset } from '../../_logic/TimerPreset';

/**
 * Generated class for the EditClockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-clock',
  templateUrl: 'edit-clock.html',
})
export class EditClockPage {

  playerOneHours: number;
  playerOneMinutes: number;
  playerOneSeconds: number;

  playerTwoHours: number;
  playerTwoMinutes: number;
  playerTwoSeconds: number;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, private gameState: GameStateProvider, ) {

    var millisec = this.gameState.timer1.time;

    var seconds = Math.floor((millisec / 1000) % 60)
      , minutes = Math.floor((millisec / (1000 * 60)) % 60)
      , hours = Math.floor((millisec / (1000 * 60 * 60)) % 24);

    this.playerOneHours = hours;
    this.playerOneMinutes = minutes;
    this.playerOneSeconds = seconds;

    millisec = this.gameState.timer2.time;
    seconds = Math.floor((millisec / 1000) % 60)
      , minutes = Math.floor((millisec / (1000 * 60)) % 60)
      , hours = Math.floor((millisec / (1000 * 60 * 60)) % 24);

    this.playerTwoHours = hours;
    this.playerTwoMinutes = minutes;
    this.playerTwoSeconds = seconds;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save() {
    var player1TotalMinutes =  parseInt(this.playerOneMinutes.toString());
    if(parseInt(this.playerOneHours.toString()) > 0)
      player1TotalMinutes += (60 / parseInt(this.playerOneHours.toString()));

    var player2TotalMinutes =   parseInt(this.playerTwoMinutes.toString());
    if(parseInt(this.playerTwoHours.toString()) > 0)
      player2TotalMinutes += (60 / parseInt(this.playerTwoHours.toString()));

    this.gameState.updateTimer1Time(new TimerPreset({
      minutes: player1TotalMinutes,
      seconds: this.playerOneSeconds
    }));
    this.gameState.updateTimer2Time(new TimerPreset({
      minutes: player2TotalMinutes,
      seconds: this.playerTwoSeconds
    }));

    this.viewCtrl.dismiss();
  }
}
