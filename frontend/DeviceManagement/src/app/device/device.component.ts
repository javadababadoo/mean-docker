import { Component, OnInit } from '@angular/core';
import { Idevice } from '../idevice';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  devicesList: Idevice[];
  deviceId: string;

  constructor(public deviceService: DeviceService) { }

  ngOnInit() {
    this.findDevices();
  }

  findDevices() {
    console.log('prueba' + this.deviceId);
    if (this.deviceId != null && this.deviceId.trim().length > 0) {
      this.findDeviceById();
    }else {
      this.findAllDevices();
    }
  }

  findAllDevices() {
    this.deviceService.getDeviceList().subscribe(
      (devices) => {
        this.devicesList = [];
        this.devicesList = devices;
      }
    );
  }

  findDeviceById() {
    console.log('DeviceId -> ' + this.deviceId);
    this.deviceService.getDeviceById(this.deviceId).subscribe(
      (devices) => {
        this.devicesList = [];
        this.devicesList.push(devices);
      }
    );

  }

}
