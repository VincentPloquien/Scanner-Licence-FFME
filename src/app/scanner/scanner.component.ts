import { Component, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {
  scannerEnabled = false;
  oneShotScan = false;

  constructor() { }

  ngOnInit(): void {
  }

  scanSuccessHandler(result: any): void {
    console.log(result);
    if (this.oneShotScan) {
      this.scannerEnabled = false;
    }
  }
  scanErrorHandler(error: any): void {
    console.error(error);
  }

}
