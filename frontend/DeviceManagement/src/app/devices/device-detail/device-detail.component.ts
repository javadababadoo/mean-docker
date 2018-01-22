import { Component, OnInit, Input } from '@angular/core';
import { DeviceService } from '../../device.service';
import { Idevice } from '../../idevice';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {

  @Input() selectedDevice: Idevice;

  constructor(public route: ActivatedRoute, public deviceService: DeviceService, private _location: Location) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const deviceId = params.get('deviceId');
      console.log(deviceId);

      this.deviceService.getDeviceById(deviceId).subscribe(
        (devices) => {
          this.selectedDevice = devices;
        },
        (error) => {
          this.selectedDevice = null;
        }
      );
    });
  }

  backClicked() {
    this._location.back();
  }

}
