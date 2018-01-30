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
import { filter } from 'rxjs/operators/filter';
import { DEVICE_TYPES } from './device-type';
import { first } from 'rxjs/operators/first';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { defaultIfEmpty } from 'rxjs/operators/defaultIfEmpty';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { switchMap } from 'rxjs/operators/switchMap';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { startWith } from 'rxjs/operators/startWith';

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

  observableMRA$: Observable<string>;

  observableVOC$: Observable<string>;

  observableLSR$: Observable<string>;

  combineResult$: Observable<[{}, {}, {}]>;

  private lastDeviceSubscription: Subscription;

  keySubject: Subject<string> = new Subject();

  constructor(public deviceService: DeviceService) { }

  ngOnInit() {
    this.findDevices();
    this.initObservables();
    this.deviceService.test();
  }

  selectDevice(device: Idevice) {
    console.log('Selecte device: ' + JSON.stringify(device));
    this.deviceService.putSelectedDevice(device);
  }

  initObservables() {

    this.devices$ = this.keySubject.asObservable().pipe(
      debounceTime(1000),
      startWith(''),
      distinctUntilChanged(),
      switchMap(textfilter => this.deviceService.getDeviceList(textfilter))
    );

    // this.devices$.subscribe(function(val){
    //     console.log(val);
    // });

    // this.keySubject.pipe(
    //   debounceTime(1000),
    //   distinctUntilChanged(),
    //   switchMap(textfilter => this.deviceService.getDeviceList(textfilter))
    // ).subscribe(function(val){
    //   console.log(val);
    // });

    // this.devices$ = this.deviceService.getDeviceList(null);

    this.devicesGroup$ = this.devices$.pipe(
      mergeMap(obs$ => Observable.from(obs$)),
      groupBy(device => device.type),
      mergeMap(list$ => {
        const count$ = list$.count();
        return count$.map(count => ({ type: list$.key, count }));
      }),
      toArray(),
    );

     this.combineResult$ = combineLatest(this.deviceService.observableMRA$,
      this.deviceService.observableLSR$,
      this.deviceService.observableVOC$);

    this.devicesGroup$.subscribe(function (val) {
      console.log('Text');
      console.log(val);
    });



    //////////////////////////////////////

    // const pageSource = this.pageStream.map(pageNumber => {
    //   this.page = pageNumber;
    //   return {search: this.terms, page: pageNumber};
    // });

    // const searchSource = this.searchTermStream
    //     .debounceTime(1000)
    //     .distinctUntilChanged()
    //     .map(searchTerm => {
    //       this.terms = searchTerm;
    //       return {search: searchTerm, page: 1};
    //     });

    //     const source = pageSource
    //     .merge(searchSource)
    //     .startWith({search: this.terms, page: this.page})
    //     .mergeMap((params: {search: string, page: number}) => {
    //       console.log('test');
    //       return this.deviceService.getDeviceList();
    //     })
    //     .share();

    //     source.pluck('_id');
  }

  findDevices() {
    if (this.deviceId != null && this.deviceId.trim().length > 0) {
      this.findDeviceById();
    } else {
      this.findAllDevices();
    }
  }

  findAllDevices() {
    this.deviceService.getDeviceList(null).subscribe(
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
    this.lastDeviceSubscription.unsubscribe();
  }

  search(searchFilterText) {
    console.log('searchFilterText');
    this.keySubject.next(searchFilterText);
  }

}
