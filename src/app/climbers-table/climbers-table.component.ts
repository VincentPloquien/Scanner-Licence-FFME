import { Component, Input } from '@angular/core';
import Climber from 'src/app/climber';

@Component({
  selector: 'app-climbers-table',
  templateUrl: './climbers-table.component.html',
  styleUrls: ['./climbers-table.component.css']
})
export class ClimbersTableComponent {

  @Input() climbers!: Climber[];

  resetClimbersList(): void {
    this.climbers = [];
  }

  deleteClimberFromList(climber: Climber): void {
    this.climbers.splice(this.climbers.indexOf(climber), 1);
    console.log(this.climbers);
  }

}
