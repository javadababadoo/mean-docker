import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { DeviceComponent } from './device/device.component';
import { DeviceService } from './device.service';


@NgModule({
  declarations: [
    AppComponent,
    DeviceComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
