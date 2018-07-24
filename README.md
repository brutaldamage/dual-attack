# ionic-game-clock

an attempt at rebuilding our game clock using ionic & capacitor.

The UI of this app is based on [https://github.com/mishabosin/web-chess-clock](https://github.com/mishabosin/web-chess-clock). It was ported to work with ionic 3.

The app is built for android currently, iOS is coming soon, using the [ionic capcitor framework](https://capacitor.ionicframework.com/). 

## what is it?
We (Brutal Damage) wanted a way to display live updates of clock info for our Warmahordes games. We couldn't find anything that did the job, so we built one ourselves.
The first version was a frankenstein hack of a few projects on github to make something that worked. ([See it over here](https://github.com/brutaldamage/game-clock))

Once we proved that it worked, and we could create an easily portable solution to display clock and scoring info on a remote device/screen we decided we wanted to build it in something
that was a easier to work with. Since we have a variety of developer skill sets in our meta, we opted to go with web stack for most of the core of the app, and use capacitor to get it working on mobile devices (and eventually electron).

So thats what this repo is.

## how does it work?
#### or at least, how it WILL work when finished.
The UI is pretty simple, its a single UI with some configurable options (mostly just time on the clock). There are (or will) be some presets for default times for various game sizes.

On app start, the app creates an interal web server. This web server can be accessed from any device that is on the same network as the phone running the app. Clicking the "internet" button in the top right will display the ip address the server can be accessed from.

If you hit the root of that url, you'll get a web page. That web page will display the same game info thats on the mobile app, but its accessible via a web browser on a different device! How cool is that? From there, you can pull that webpage into whatever you want. Display it as is on a tv, do some custom CSS to put the overlay in OBS (or something similar). The options are pretty limitless!


## known issues
This repo was spun up recently, so things are still a work in progress.

Right now, we've got an issue getting the web server code to process the game state info. So, if you try to hit the api url (http://{ipaddress}:8080/data) you'll see an error popped up in the app. 

## want to contribute? 

*  clone the repository

* follow the capacitor docs to get dependencies installed for iOS & Android
[https://capacitor.ionicframework.com/docs/getting-started/dependencies/](https://capacitor.ionicframework.com/docs/getting-started/dependencies/)

* install ionic

  `npm install -g ionic`

* restore npm in the project directory

  `npm install`

  this should pull in capacitor (its an npm dependency of the project).
  
* sync the latest web files to the android project

  `npx cap add android`
  
  `npx cap sync`

* open the gradle project in android studio (under the android folder)
* run or debug to a device or emulator from android studio
