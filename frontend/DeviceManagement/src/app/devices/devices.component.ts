import { Component, OnInit } from '@angular/core';
import { Idevice } from '../idevice';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  devicesList: Idevice[];
  deviceId: string;
  selectedDevice: Idevice;
  errorMessage: string;

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
      },
      (error) => {
        this.errorMessage = <any>error;
      }
    );
  }

  findDeviceById() {
    console.log('DeviceId -> ' + this.deviceId);
    this.deviceService.getDeviceById(this.deviceId).subscribe(
      (devices) => {
        this.devicesList = [];
        this.devicesList.push(devices);
      },
      (error) => {
        this.errorMessage = <any>error;
      }
    );
  }

  onSelectedDevice(device: Idevice) {
    this.selectedDevice = device;
  }

}
