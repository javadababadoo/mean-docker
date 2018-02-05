import { reducers } from './app.reducer';
import { StoreModule, Action } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing/routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DeviceService } from './device.service';
import { DevicesComponent } from './devices/devices.component';
import { AboutComponent } from './about/about.component';
import { DeviceComponent } from './devices/device/device.component';
import { DeviceDetailComponent } from './devices/device-detail/device-detail.component';
import { HighLightDirective } from './high-light.directive';
import { PageHeaderComponent } from './page-header/page-header.component';
import { LOADED_DEVICES, LoadDeviceAction } from './store/actions';

// export function storeReducer(state: ApplicationState = INITIAL_APPLICATION_STATE, action: Action): ApplicationState {
//   return {
//     uiState: uiStateReducer(state.uiState, action),
//     storeData:  uiStoreReducer(state.storeData, action)
//   };
// }

@NgModule({
  declarations: [
    AppComponent,
    DeviceComponent,
    DevicesComponent,
    DeviceDetailComponent,
    HighLightDirective,
    PageHeaderComponent,
    AboutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    ReactiveFormsModule,
    HttpModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
