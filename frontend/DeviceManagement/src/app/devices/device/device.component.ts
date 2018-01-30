import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Idevice } from '../../idevice';
import { DeviceService } from '../../device.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

 @Output() selectedDeviceEmmiter = new EventEmitter<string>();

  @Input() device: Idevice;

  constructor(public snackBar: MatSnackBar, public deviceService: DeviceService) { }

  ngOnInit() {
  }

  deleteDevice() {
    this.deviceService.deleteDevice(this.device._id).subscribe(
      (data) => {
        this.selectedDeviceEmmiter.emit(this.device._id);
    this.openSnackBar('Device successfully deleted');
      },
      (error) => {
        console.log('Error deleting device ' + this.device._id);
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  /**onSelectedDevice() {
    // this.device = idevice;
    console.log('Selected -> ' + this.device);
    this.deviceService.setSelectedDevice(this.device);
    this.selectedDeviceEmmiter.emit(this.device);
  }**/

}
