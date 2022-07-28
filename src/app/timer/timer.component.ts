import { Component, OnInit } from '@angular/core';
import { APP_CONFIG } from '../../environments/environment';
import { ElectronService } from '../core/services';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  timer: any;

  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  private lastHours: number = 0;
  private lastMinutes: number = 0;
  private lastSeconds: number = 0;

  isRunning: boolean = false;

  constructor(
    private electronService: ElectronService
  ) {
    console.log('APP_CONFIG', APP_CONFIG);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }

  ngOnInit(): void {
    
  }

  handleClickMore(type: string) {
    if (this.isRunning) return;

    switch (type) {
      case 'H':
        this.hours++;
        break;
        
        case 'M':
          if (this.minutes >= 59) return;
          this.minutes++;
        break;

      case 'S':
        if (this.seconds >= 59) return;
        this.seconds++;
        break;
    }
  }

  handleClickLess(type: string) {
    if (this.isRunning) return;

    switch (type) {
      case 'H':
        if (!this.hours) return;
        this.hours--;
        break;

      case 'M':
        if (!this.minutes) return;
        this.minutes--;
        break;

      case 'S':
        if (!this.seconds) return;
        this.seconds--;
        break;
    }
  }

  updateTimer() {
    console.log('updating');

    if (!this.seconds) {
      if (!this.minutes) {
        if (!this.hours) {
          this.endTimer();
          return;
        }

        console.log('menos hora');
        this.hours--;
        this.minutes = 59;
        this.seconds = 59;
      }
      else {
        console.log('menos minuto');
        this.minutes--;
        this.seconds = 59;
      }
    }
    else
    {
      this.seconds--;
    }
  }

  endTimer() {
    console.log('end timer');
    clearInterval(this.timer);
    this.timer = null;
    this.isRunning = false;
    this.shutdown();
  }

  shutdown() {
    this.electronService.shutdown();
  }

  handleClickPlayPause() {
    if (this.isRunning) 
      this.PauseTimer();
    else 
      this.PlayTimer();
  }

  PlayTimer() {
    this.isRunning = true;

    this.lastHours = this.hours;
    this.lastMinutes = this.minutes;
    this.lastSeconds = this.seconds;

    this.timer = setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  PauseTimer() {
    this.isRunning = false;
    this.endTimer();
  }

  handleClickReset() {
    this.PauseTimer();

    this.hours = this.lastHours;
    this.minutes = this.lastMinutes;
    this.seconds = this.lastSeconds;
  }

  handleClickStop() {
    this.endTimer();

    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
  }

}
