# Dual Attack

Dual Attack is a web and mobile application built with [Ionic Capactior](https://capacitor.ionicframework.com/) that can be used to manage the death clock, turn counter and control point tracking during a Warmachine or Hordes game.

The UI of this app is based on [https://github.com/mishabosin/web-chess-clock](https://github.com/mishabosin/web-chess-clock). It was ported to work with ionic 3.

The app is currently functional on web and iOS. Android is in the works (everything works except the web server).

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

## Known Issues
The webserver currently only works on iOS. Since this project is still a work in progress, we need to get the webserver implemented in the Android app. 

## want to contribute? 

### getting started

*  clone the repository

* follow the capacitor docs to get dependencies installed for iOS & Android
[https://capacitor.ionicframework.com/docs/getting-started/dependencies/](https://capacitor.ionicframework.com/docs/getting-started/dependencies/)

* install ionic

  `npm install -g ionic`

* restore npm in the project directory

  `npm install`

  this should pull in capacitor (its an npm dependency of the project).

 * sync the latest web files to the android/ios/web projects
  
  `npx cap sync` 
  
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

Coming soon. There isn't a build pipeline or anything setup yet. So using the app is local dev only.

### web

The web app is hosted on netlify.com currently. That gives us free hosting for static content (which this is) and gives us a really simple build pipeline. Netlify is hooked up to the master branch of the repository. Push some commits to master, and the changes should show up over at [https://dual-attack.app](https://dual-attack.app) in a few minutes.


## Contributors
* Drew Frisk: [keannan5390](https://github.com/keannan5390)
* Lance Aeby: [lanceaeby](https://github.com/lanceaeby)
