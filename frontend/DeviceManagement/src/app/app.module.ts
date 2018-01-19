import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { DeviceService } from './device.service';
import { DevicesComponent } from './devices/devices.component';
import { DeviceComponent } from './devices/device/device.component';
import { DeviceDetailComponent } from './devices/device-detail/device-detail.component';
import { HighLightDirective } from './high-light.directive';


@NgModule({
  declarations: [
    AppComponent,
    DeviceComponent,
    DevicesComponent,
    DeviceDetailComponent,
    HighLightDirective
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
