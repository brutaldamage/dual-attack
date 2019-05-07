import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { GameStateProvider } from '../providers/game-state/game-state';
import { WebserverProvider } from '../providers/webserver/webserver';
import { EditClockPage } from '../pages/edit-clock/edit-clock';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SettingsPage,
    EditClockPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SettingsPage,
    EditClockPage
  ],
  providers: [
    StatusBar,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GameStateProvider,
    WebserverProvider
  ]
})
export class AppModule {}
