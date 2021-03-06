import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ScannerComponent } from './scanner/scanner.component';
import { LicenceDisplayComponent } from './licence-display/licence-display.component';
import { ClimbersTableComponent } from './climbers-table/climbers-table.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ScannerComponent,
    LicenceDisplayComponent,
    ClimbersTableComponent
  ],
  imports: [
    ZXingScannerModule,
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
