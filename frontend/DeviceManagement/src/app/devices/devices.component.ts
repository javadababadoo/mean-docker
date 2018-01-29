import { Component, OnInit } from '@angular/core';
import { Idevice } from '../idevice';
import { DeviceService } from '../device.service';
import { Observable } from 'rxjs/Observable';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { catchError, map, tap, groupBy, flatMap } from 'rxjs/operators';
import 'rxjs/Rx';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { toArray } from 'rxjs/operators/toArray';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit, OnDestroy {

  devicesList: Idevice[];
  deviceId: string;
  selectedDevice: Idevice;
  errorMessage: string;
  devices$: Observable<Idevice[]>;

  devicesGroup$: Observable<any[]>;

  subscription: Subscription;


  constructor(public deviceService: DeviceService) { }

  ngOnInit() {
    this.findDevices();
    this.initObservables();
  }

  initObservables() {
    this.devices$ = this.deviceService.getDeviceList();



    this.devicesGroup$ = this.devices$.pipe(
      mergeMap(obs$ => Observable.from(obs$)),
      groupBy(device => device.type),
      mergeMap( list$ => {
        const count$ = list$.count();
        return count$.map( count => ({ type: list$.key, count }));
      }),
      toArray(),
    );

    this.devicesGroup$.subscribe(function(val){
      console.log('Text');
      console.log(val);
    });
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

        // this.devicesGroup$ = Observable.from(this.devicesList).pipe(
        //   groupBy(device => device.type),
        //   mergeMap( list$ => {
        //     const count$ = list$.count();
        //     return count$.map( count => ({ type: list$.key, count }));
        //   }),
        //   toArray(),
        // );

        // this.devicesGroup$.subscribe(function(val){
        //   console.log(val);
        // });

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

  onSelectedDevice(deviceId: string) {
    this.findAllDevices();
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

}
