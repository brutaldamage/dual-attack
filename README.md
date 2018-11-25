# Dual Attack

an attempt at rebuilding our game clock using ionic & capacitor.

The UI of this app is based on [https://github.com/mishabosin/web-chess-clock](https://github.com/mishabosin/web-chess-clock). It was ported to work with ionic 3.

The app is currently functional on web and iOS. Android is in the works (everything works except the web server). It is built using the [ionic capcitor framework](https://capacitor.ionicframework.com/). 

## what is it?
We ([Brutal Damage](https://brutaldamage.blog)) wanted a way to display live updates of clock, turn, and CP info for our Warmahordes Youtube streams. We couldn't find anything that did the job, so we built one ourselves.

The first version was a frankenstein hack of a few projects on github to make something that worked. ([See it over here](https://github.com/brutaldamage/game-clock))

Once we proved out a solution for an easily portable app to display game info on a remote device/screen, we decided we wanted something that was easier to develop (not hacked together) and use a more current tech-stack. Since we have a variety of developer skill sets in our meta, we decided to go with a web stack for the core logic of the app, and use capacitor to get it working as a native app on mobile devices (and eventually electron).

So thats what this repo is.

## how does it work?

The UI is pretty simple, its a single UI with some configurable options (mostly just time on the clock). It includes some presets for default times for the standard tournament game sizes.

### on the web

### via the native app
If you run the android or iOS app, when it starts, the app will create an interal web server. This web server can be accessed from any device on the same network as the phone/tabelt running the app. Clicking the "internet" button in the top right will display the IP address the server can be accessed from.

If you hit the root of that url, you'll get a web page. That web page will display the same game info that is on the mobile app. How cool is that!?! From there, you can use that webpage to display the game info wherever you want. Display it as is on a tv, do some custom CSS to put the overlay in OBS (or something similar). The options are pretty limitless!

## known issues
The webserver currently only works on iOS. The webserver code is implemented natively for android & iOS, and we still need to write the implemention for Android.

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

The web app is published using github pages in the `gh-pages` branch of this repository. The `www` folder needs to be published to the root of the `gh-pages` branch.

`git subtree push --prefix www origin gh-pages`
