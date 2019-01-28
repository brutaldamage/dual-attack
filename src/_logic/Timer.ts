const BASE_TICK_TIME = 100; // .1 second

export class Timer {
    presetMinutes: number;

    time: number;
    isTicking: boolean;
    isOutOfTime: boolean;
  
    constructor(public name: string, private preset: any) {
      this.time = 0; // milliseconds currently on the clock
      this.isTicking = false;
      this.isOutOfTime = false;
  
      this.setFromPreset(preset);
    }
  
    setFromPreset(preset: any) {
      this.time = 0;
      this.time += preset.minutes * 60000;
      this.time += preset.seconds * 1000;

      this.presetMinutes = preset.minutes;
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
  
    stop() {
      this.isTicking = false;
     
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
  
    getBundle() : any {
      return {
        time: this.time,
        isTicking: this.isTicking,
        isOutOfTime: this.isOutOfTime
      }
    }

    restoreBundle(bundle: any) {
      console.log("restore timer bundle: ");
      console.log(JSON.stringify(bundle));
      this.time = Number(bundle.time);
      this.isTicking = bundle.isTicking === "true";
      this.isOutOfTime = bundle.isOutOfTime === "true";
    }
  }