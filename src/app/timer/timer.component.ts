import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  time: number = 0;
  timer: any;

  constructor() { }

  ngOnInit(): void {
    
  }

  handleClickStart() {
    if (this.timer) return;
    
    this.timer = setInterval(() => {
      this.time++;
    }, 1000);
  }

  handleClickStop() {
    clearInterval(this.timer);
    this.timer = null;
  }

}
