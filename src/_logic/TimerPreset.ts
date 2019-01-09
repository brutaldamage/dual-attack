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