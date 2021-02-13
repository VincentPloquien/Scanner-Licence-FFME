import { Component, Input, OnInit } from '@angular/core';
import Climber from '../climber';

@Component({
  selector: 'app-licence-display',
  templateUrl: './licence-display.component.html',
  styleUrls: ['./licence-display.component.css']
})
export class LicenceDisplayComponent implements OnInit {
  @Input() climber!: Climber;

  constructor() { }

  ngOnInit(): void {
  }

}
