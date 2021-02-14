import { Component, Input } from '@angular/core';
import Climber from '../climber';

@Component({
  selector: 'app-licence-display',
  templateUrl: './licence-display.component.html',
  styleUrls: ['./licence-display.component.css']
})
export class LicenceDisplayComponent {
  @Input() climber!: Climber;

}
