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


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/**
 * Custom ErrorStateMatcher which returns true (error exists) when the parent form group is invalid and the control has been touched
 */
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      return control.parent.invalid && control.touched;
  }
}

export function patternValidator1(formGroup: FormGroup): ValidatorFn {
  console.log(formGroup.get('name').value);
  /**return (control: AbstractControl): { [key: string]: any } => {
    console.log(control);
    console.log('value ' + control.value);

    const value1 = control.get(key1).value;
    console.log('value1 ' + value1);
    const value2 = control.get(key2).value;
    console.log('value2 ' + value2);
    const pattern = '^' + value2 + '?';
    const expr = new RegExp(pattern);
    const forbidden = expr.test(value1);
    // return forbidden ? {'pattern': {value: control.value}} : null;
};**/
  return null;
}

export function ValidateUrl(control: AbstractControl) {
  console.log(control);
  if (control.parent != undefined) {
    console.log(control.parent.controls);
  }else {
    console.log('Validator undefined');
  }
  // console.log(control.parent.controls);
  return null;
}

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {

  deviceFormControl = new FormGroup({
    name: new FormControl('', [Validators.minLength(3), Validators.maxLength(20), Validators.required, ValidateUrl]),
    description: new FormControl('', [Validators.maxLength(50)]),
    type: new FormControl('', [Validators.required]),
 });

 confirmValidParentMatcher = new ConfirmValidParentMatcher();

  isNew: boolean;

  deviceTypes = [
    'VOC',
    'MRA',
    'LSR'
  ];

  @Input() selectedDevice: Idevice;

  constructor(public snackBar: MatSnackBar, public route: ActivatedRoute,
    public deviceService: DeviceService, private _location: Location, public fb: FormBuilder) { }

  ngOnInit() {
    /**this.deviceFormControl = this.fb.group({
      name: ['', [Validators.minLength(3), Validators.maxLength(20), Validators.required], ValidateUrl],
      description: ['', Validators.maxLength(50)],
      type: ['', Validators.required],
    });**/

    this.route.paramMap.subscribe(params => {
      const deviceId = params.get('deviceId');
      console.log(deviceId);

      this.isNew =  (deviceId == null || deviceId.trim().length === 0);

      console.log('isNew -> ' + this.isNew);

      if (!this.isNew) {
        this.deviceService.getDeviceById(deviceId).subscribe(
          (devices) => {
            // devices.type = null;
            this.selectedDevice = devices;
          },
          (error) => {
            this.selectedDevice = null;
          }
        );
      }else {
        this.selectedDevice = new Idevice();
      }

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
