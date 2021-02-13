import { Component } from '@angular/core';
import Climber from './climber';
import { ClimbersService } from './climbers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  climbers: Climber[] = [];
  lastScannedClimber: Climber | undefined;

  constructor(private climbersService: ClimbersService) { }

  ngOnInit() {
    this.climbers = this.climbersService.getClimbers();
    this.lastScannedClimber = this.climbers[this.climbers.length - 1];
  }

  scannedURLHandler(url: string): void {
    this.climbersService.addClimberFromURL(url);
  }
}
