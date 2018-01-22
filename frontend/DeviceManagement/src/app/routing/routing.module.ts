import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevicesComponent } from '../devices/devices.component';
import { AboutComponent } from '../about/about.component';
import { DeviceComponent } from '../devices/device/device.component';
import { DeviceDetailComponent } from '../devices/device-detail/device-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DevicesComponent,
    pathMatch: 'full'
  },
  {
    path: 'device-detail',
    component: DeviceDetailComponent
  },
  {
    path: 'device-detail/:deviceId',
    component: DeviceDetailComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }
