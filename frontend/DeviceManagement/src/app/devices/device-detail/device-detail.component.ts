import { Component, OnInit, Input } from '@angular/core';
import { DeviceService } from '../../device.service';
import { Idevice } from '../../idevice';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {

  deviceFormControl = new FormGroup({
    name: new FormControl('', [Validators.minLength(3), Validators.maxLength(20), Validators.required]),
    description: new FormControl('', [Validators.maxLength(50)]),
    type: new FormControl('', [Validators.required]),
 });

  matcher = new MyErrorStateMatcher();

  deviceTypes = [
    'Type1',
    'Type2',
    'Type3'
  ];

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

  saveChanges() {
    console.log(' ---- > ' + this.deviceFormControl.invalid);
    if (this.deviceFormControl.invalid) {
      return;
   }
    this.deviceService.updateDevice(this.selectedDevice).subscribe(
      (devices) => {
        this.selectedDevice = devices;
        console.log('Save changes -> ' + JSON.stringify(devices));
      },
      (error) => {
        this.selectedDevice = null;
        console.log('Error saving changes -> ' + error);
      }
    );
  }

  backClicked() {
    this._location.back();
  }

}
