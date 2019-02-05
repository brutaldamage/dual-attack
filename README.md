# Dual Attack

Dual Attack is a web and mobile application built with [Ionic Capactior](https://capacitor.ionicframework.com/) that can be used to manage the death clock, turn counter and control point tracking during a Warmachine or Hordes game.

| Platform      | Build Status |
| ----------- | ----------- |
| Android      | [![Android Build status](https://build.appcenter.ms/v0.1/apps/38488105-b297-42de-990e-061ad67d24e3/branches/master/badge)](https://appcenter.ms)       |
| iOS   | [![iOS Build status](https://build.appcenter.ms/v0.1/apps/abe49c68-a184-456b-82cf-d5524f3f7899/branches/master/badge)](https://appcenter.ms)        |
| Web   | [![Netlify Status](https://api.netlify.com/api/v1/badges/91ca6702-96d5-40c5-9d15-dcfbe91e4a6d/deploy-status)](https://app.netlify.com/sites/competent-brahmagupta-3e733d/deploys)       |

## Start Playing
* [Google Play: Android](https://play.google.com/store/apps/details?id=blog.brutaldamage.dualattack)
* [App Store: iOS](https://itunes.apple.com/us/app/dual-attack/id1449425043?ls=1&mt=8)
* [Web: dual-attack.app](https://dual-attack.app)

## What Is It?
We ([Brutal Damage](https://brutaldamage.blog)) wanted a way to display live updates of clock, turn, and CP info for our Warmachine & Hordes Youtube streams. We had trouble finding something that did what we wanted, so we decided to build what we couldn't find.

The first version was a frankenstein hack of a few projects found around github. We used that to figure out what we needed and how we wanted things to work. If your curious about the first prototype, go check it out ([over here](https://github.com/brutaldamage/game-clock)).

Our meta has a few developers in it, but we all of slightly different skill sets when it comes to tech-stacks of choice. We chose Ionic Capacitor because it gives us the best of both worlds -- friendly web tech, and native mobile applications. This also gives us the ability to easily make a desktop app in the future if we want.

## How Does It Work?

The UI is pretty simple, its a single UI with some configurable options (mostly just time on the clock). It includes some presets for default times for the standard tournament game sizes.

#### Android & iOS App
If you run the Android or iOS app, when it starts, the app will create an interal web server. This web server can be accessed from any device on the same network as the device running the app. Clicking the "internet" button in the top right nav bar will display the IP address the server can be accessed from.

If you launch that url in a web browser you'll get a web page that displays the game stats from the mobile app in realtime. How cool is that!?! This allows the game stats to easily be displayed on an external device, such as a TV or monitor. For us, we open the url in [OBS](https://obsproject.com/) and put some custom CSS over the top of it so it can be displayed on our streams and recordings. See the customizing section below for info on modifying the default output.

#### Web App
We weren't originally going to publish this as a web application, but capacitor makes it really easy. So, we made some adjustments to disable all the web server code and made the main part of the app available as a static site. Check it out at [https://dual-attack.app](https://dual-attack.app).

## Customizing
We use dual attack with OBS by overlaying the web page served from the web server on the camera feed. But, since OBS is really flexible, you can adjust as necessary. The web server has 2 endpoints available, one to return the game state via a JSON response, and one to return the simple web pages. Those urls are as follows:

* http://{IPAddress}:8080

The root URL will serve up the web page that contains a basic output of the current game state. It will refresh every second to display any changes to game state.

* http://{IPAddress}:8080/data

The data endpoint will expose a JSON object that includes the current game state. If you continusoully refresh this endpoint, it will stay current with the current data of the game. 
If you want to customize the data overlay beyond the webpage, the web server exposes the game state as a JSON object. Hit http://{IPAddress}:8080/data in a web browser or with your scripting language of choice to get a JSON object containing all the game data.

### Using CSS

We use the following CSS in our OBS setup if you want to use it as a starting point:

```
body { overflow: hidden; color: #FFFFFF; }

.flex-container>div { background: none; font-size: 45px; margin: 10px 40px;  }
```

### Using Python

OBS supports loading text files. I believe other camera overlay software has the same functionality. If you'd rather use a text file over manipulating CSS on a web page, reddit user [/u/Bose_Motile](https://www.reddit.com/user/Bose_Motile) created this python script to do a file import with Dual Attack and OBS: [https://pastebin.com/yh4FqWbA](https://pastebin.com/yh4FqWbA).

## Contributing?

Please review the [contributing guide](https://github.com/brutaldamage/dual-attack/blob/master/CONTRIBUTING.md) before making changes and issuing PRs to Dual Attack.

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

* create a pull request, see the contributing guide for 

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
* LargeGeek: [LargeGeek](https://github.com/LargeGeek)

### 3rd Party
* Icon designed by [Freepik](https://www.flaticon.com/authors/freepik) from **Flaticon**.
