import { Component, OnInit, Input } from '@angular/core';
import { DeviceService } from '../../device.service';
import { Idevice } from '../../idevice';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {

  @Input() selectedDevice: Idevice;

  constructor(public deviceService: DeviceService) { }

  ngOnInit() {
  }

}
