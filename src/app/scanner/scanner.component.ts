import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent {
  scannerEnabled = false;
  oneShotScan = false;

  @Output() scannedURL = new EventEmitter();

  scanSuccessHandler(result: string): void {
    console.log(result);
    if (this.oneShotScan) {
      this.scannerEnabled = false;
    }

    this.scannedURL.emit(result);
  }

  scanErrorHandler(error: Error): void {
    console.error(error);
  }

}
