import { LoadDeviceAction } from './../store/actions';
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
import { share } from 'rxjs/operators/share';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { ApplicationState } from '../app.reducer';
// import * as fromApp from '../store/app.reducer';

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


  devicesSubject$: Observable<Idevice[]>;

  devicesGroup$: Observable<any[]>;

  observableMRA$: Observable<string>;

  observableVOC$: Observable<string>;

  observableLSR$: Observable<string>;

  combineResult$: Observable<[{}, {}, {}]>;

  private lastDeviceSubscription: Subscription;

  keySubject: Subject<string> = new Subject();

  constructor(public deviceService: DeviceService, private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.findDevices();
    this.initObservables();
    // this.deviceService.test();

    //////////// PRACTICE /////////////
    // const observableIssue = this.deviceService.getIssue().pipe(
    //   map(issue => issue.fields.creator.key)
    // );

    // const observableOrganizations = this.deviceService.getOrganizations().pipe(
    //   map(organization => organization.values),
    //   map(array => Observable.from(array)),
    //   mergeMap(val => val.map(test => {
    //     return {id: test.id, name: test.name};
    //   })),
    // );

    // const usersOrganization = observableOrganizations
    // .pipe(
    //   mergeMap(val => {

    //     // this.deviceService.getUsersByOrganization(val.id).pipe(
    //     //   mergeMap(val =>)
    //     // );

    //     return this.deviceService.getUsersByOrganization(val.id)
    //     .map(res => ({ name: val.name, users: res}));
    //   }),
    //   toArray(),
    //   map(array => Observable.from(array)),
    //   mergeMap(val => val)
    // );

    // usersOrganization.subscribe(console.log);

    ////////////////////////////

  }


  initObservables() {
    this.devices$ = this.store.select(state => {
      return this.mapStateToDevices(state);
    });

    this.devicesGroup$ = this.store.select(state => {
      return this.mapStateToDevicesGropup(state);
    });

    this.devicesGroup$ = this.devices$.pipe(
      mergeMap(obs$ => Observable.from(obs$)),
      groupBy(device => device.type),
      mergeMap(list$ => {
        const count$ = list$.count();
        return count$.map(count => ({ type: list$.key, count }));
      }),
      toArray(),
    );


    this.store.subscribe(
      state => {
        console.log('Devices component received state', state);
      }
    );


    this.deviceService.getDeviceList(null).subscribe(
      data => {
        console.log('getDeviceList');
        this.store.dispatch(new LoadDeviceAction(data));
      }
    );



    this.devicesSubject$ = this.keySubject.asObservable().pipe(
      debounceTime(1000),
      startWith(''),
      distinctUntilChanged(),
      switchMap(textfilter => {
        return this.deviceService.getDeviceList(textfilter);
      })
    );

    // this.keySubject.pipe(
    //   debounceTime(1000),
    //   distinctUntilChanged(),
    //   switchMap(textfilter => this.deviceService.getDeviceList(textfilter))
    // ).subscribe(function(val){
    //   console.log(val);
    // });

    // this.devices$ = this.deviceService.getDeviceList(null);

    // this.devicesGroup$.subscribe(function (val) {
    //   console.log('Text');
    //   console.log(val);
    // });

     this.combineResult$ = Observable.combineLatest(this.deviceService.observableMRA$,
      this.deviceService.observableLSR$,
      this.deviceService.observableVOC$);
    //////////////////////////////////////
  }

  mapStateToDevices(state: ApplicationState): Idevice[] {
    console.log('state.storeData -> ', state.storeData);
    if (!state.storeData.devices) {
      return [];
    }
    return _.values<Idevice>(state.storeData.devices);
  }

  mapStateToDevicesGropup(state: ApplicationState): Idevice[] {

    // mergeMap(obs$ => Observable.from(obs$)),
    //   groupBy(device => device.type),
    //   mergeMap(list$ => {
    //     const count$ = list$.count();
    //     return count$.map(count => ({ type: list$.key, count }));
    //   }),
    //   toArray(),


    console.log('state.storeData -> ', state.storeData);
    if (!state.storeData.devices) {
      return [];
    }

    const devices = _.values<Idevice>(state.storeData.devices);


    const val$ = Observable.from(_.values<Idevice>(state.storeData.devices)).pipe(
      groupBy(device => device.type),
      mergeMap(list$ => {
        const count$ = list$.count();
        return count$.map(count => ({ type: list$.key, count }));
      }),
      toArray()
    );

    // return _.values<Idevice>(state.storeData.devices);
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
    // this.lastDeviceSubscription.unsubscribe();
  }

  search(searchFilterText) {
    console.log('searchFilterText');
    this.keySubject.next(searchFilterText);
  }

}
