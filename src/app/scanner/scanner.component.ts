import { Component, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {

  @ViewChild('scanner', { static: false })
  scanner?: ZXingScannerComponent;

  constructor() { }

  ngOnInit(): void {

  }

  scanSuccess($event: any): void {
    console.debug($event);
    this.scanner?.scanStop();
  }

}
