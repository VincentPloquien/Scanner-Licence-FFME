import { Component, OnInit } from '@angular/core';
import Climber from './climber';
import { ClimbersService } from './climbers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  climbers: Climber[] = [];

  constructor(private climbersService: ClimbersService) { }

  ngOnInit(): void {
    this.climbers = this.climbersService.getClimbers();
  }

  scannedURLHandler(url: string): void {
    this.climbersService.addClimberFromURL(url);
  }
}
