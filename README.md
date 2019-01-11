# Dual Attack

Dual Attack is a web and mobile application built with [Ionic Capactior](https://capacitor.ionicframework.com/) that can be used to manage the death clock, turn counter and control point tracking during a Warmachine or Hordes game.

| Platform      | Build Status |
| ----------- | ----------- |
| Android      | [![Android Build status](https://build.appcenter.ms/v0.1/apps/38488105-b297-42de-990e-061ad67d24e3/branches/master/badge)](https://appcenter.ms)       |
| iOS   | [![iOS Build status](https://build.appcenter.ms/v0.1/apps/abe49c68-a184-456b-82cf-d5524f3f7899/branches/master/badge)](https://appcenter.ms)        |
| Web   | [![Web Build Status](https://travis-ci.com/brutaldamage/dual-attack.svg?branch=master)](https://travis-ci.com/brutaldamage/dual-attack)        |

## Start Playing
* [On Android](https://install.appcenter.ms/orgs/brutaldamage/apps/dual-attack-1/distribution_groups/public)
* [On the Web](https://dual-attack.app)
* On iOS (coming soon)

## What Is It?
We ([Brutal Damage](https://brutaldamage.blog)) wanted a way to display live updates of clock, turn, and CP info for our Warmachine & Hordes Youtube streams. We had trouble finding something that did what we wanted, so we decided to build what we couldn't find.

The first version was a frankenstein hack of a few projects found around github. We used that to figure out what we needed and how we wanted things to work. If your curious about the first prototype, go check it out ([over here](https://github.com/brutaldamage/game-clock)).

Our meta has a few developers in it, but we all of slightly different skill sets when it comes to tech-stacks of choice. We chose Ionic Capacitor because it gives us the best of both worlds -- friendly web tech, and native mobile applications. This also gives us the ability to easily make a desktop app in the future if we want.

## How Does It Work?

The UI is pretty simple, its a single UI with some configurable options (mostly just time on the clock). It includes some presets for default times for the standard tournament game sizes.

#### via the native mobile apps
If you run the android or iOS app, when it starts, the app will create an interal web server. This web server can be accessed from any device on the same network as the phone/tabelt running the app. Clicking the "internet" button in the top right nav bar will display the IP address the server can be accessed from.

If you launch that url in a web browser you'll get a web page that displays the information hit the root of that url. That web page will display the game stats from the mobile app in realtime. How cool is that!?! This allows the game stats to easily be displayed on an external device, such as a TV. For us, we open the url in [OBS](https://obsproject.com/) and put some custom CSS over the top of it so it can be displayed on our streams and recordings.

#### via the web
We weren't originally going to publish this as a web application, but capacitor makes it really easy. So, we made some adjustments to disable all the web server code and made the main part of the app available as a static site. Check it out at [https://dual-attack.app](https://dual-attack.app).

## want to contribute? 

### getting started

*  clone the repository

* follow the capacitor docs to get dependencies installed for iOS & Android
[https://capacitor.ionicframework.com/docs/getting-started/dependencies/](https://capacitor.ionicframework.com/docs/getting-started/dependencies/)

* install ionic

  `npm install -g ionic`

* restore npm in the project directory

  `npm install`

  this should pull in capacitor (its a npm dependency of the project).

* build & sync the latest web files to the android/ios/web projects
  
  `npx run build` 
  
### web app

* run app in a web browser

    `npm run start`

### native app

* open the native app project, either android or iOS if needed

    `npx cap open android`
    `npx cap open iOS`

* run or debug to a device or emulator from android studio

### do some stuff

* write some code

* create a pull request

## publishing the app

### mobile 

Coming soon.

### web

Coming soon.

## Credits

The UI of this app is based on the work of [Misha Bosin's Web chess clock](https://github.com/mishabosin/web-chess-clock). It was ported to work with Ionic 3.

### Contributors
* Drew Frisk: [keannan5390](https://github.com/keannan5390)
* Lance Aeby: [lanceaeby](https://github.com/lanceaeby)

### 3rd Party
* Icon designed by [Freepik](https://www.flaticon.com/authors/freepik) from **Flaticon**.
