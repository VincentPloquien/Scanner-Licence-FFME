import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {
  scannerEnabled = false;
  oneShotScan = false;

  @Output() scannedURL = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  scanSuccessHandler(result: any): void {
    console.log(result);
    if (this.oneShotScan) {
      this.scannerEnabled = false;
    }

    this.scannedURL.emit(result);
  }
  scanErrorHandler(error: any): void {
    console.error(error);
  }

}
