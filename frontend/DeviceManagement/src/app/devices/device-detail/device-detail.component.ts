import { Component, OnInit, Input } from '@angular/core';
import { DeviceService } from '../../device.service';
import { Idevice } from '../../idevice';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar} from '@angular/material';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { ValidationErrors } from '@angular/forms/src/directives/validators';
import { DEVICE_TYPES } from '../device-type';


export function forbidenNameValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
  const parent = control;
    const value1 = control.root.get('name').value;
    const value2 = control.root.get('type').value;

    if (value2) {
      const pattern = '^(' + value2 + ')';
      const expr = new RegExp(pattern, 'i');
      const allowed = expr.test(value1);
      // console.log('allowed -> ' + allowed);
      return allowed ? null : {'forbidenNameValidator': 'true'};
    }
  };
}

export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      return control.parent.invalid;
  }
}


@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {

  isNew: boolean;

  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  deviceTypes = DEVICE_TYPES;

  @Input() selectedDevice: Idevice;

  deviceFormControl: FormGroup;

  constructor(public snackBar: MatSnackBar, public route: ActivatedRoute,
    public deviceService: DeviceService, private _location: Location, public fb: FormBuilder) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const deviceId = params.get('deviceId');
      console.log(deviceId);

      this.isNew =  (deviceId == null || deviceId.trim().length === 0);

      if (!this.isNew) {
        this.deviceService.getDeviceById(deviceId).subscribe(
          (devices) => {
            this.selectedDevice = devices;
          },
          (error) => {
            this.selectedDevice = null;
          }
        );
      }else {
        this.selectedDevice = new Idevice();
        this.selectedDevice.desc = '';
        this.selectedDevice.name = '';
        this.selectedDevice.type = '';
      }
    });

    this.deviceFormControl = this.fb.group({
      name: ['', [Validators.minLength(3), Validators.maxLength(20), Validators.required],
      this.validateNameNotTaken.bind(this)],
      description: ['', [Validators.maxLength(50)]],
      type: ['', [Validators.required]],
    }, {
      validator: forbidenNameValidator()
    });
  }

  validateNameNotTaken(control: AbstractControl) {
    return this.deviceService.verifyDeviceExists(this.selectedDevice._id, control.value).map(res => {
      console.log('valid -> ' + ((res == null || !res.exists) ? null : { 'validateNameNotTaken': true }));
      return (res == null || !res.exists) ? null : { 'validateNameNotTaken': true };
    });
  }

  saveChanges() {
    console.log(' ---- > ' + this.deviceFormControl.invalid);
    if (this.deviceFormControl.invalid) {
      return;
   }

   if (this.isNew) {
    this.createDevice(this.selectedDevice);
   }else {
    this.updateDevice(this.selectedDevice);
   }

  }

  createDevice(device: Idevice) {
    this.deviceService.createDevice(device).subscribe(
      (devices) => {
        this.selectedDevice = devices;
    this.openSnackBar('Device successfully created');
    console.log('create device -> ' + JSON.stringify(devices));
        this.isNew = false;
      },
      (error) => {
        console.log('Error creating device ');
      }
    );
  }

  updateDevice(device: Idevice) {
    this.deviceService.updateDevice(this.selectedDevice).subscribe(
      (devices) => {
        this.selectedDevice = devices;
        this.openSnackBar('Device succesfully updated');
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

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

}
