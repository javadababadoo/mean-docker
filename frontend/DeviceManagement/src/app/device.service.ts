import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response, Http } from '@angular/http';
import { Observable, } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { Idevice } from './idevice';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import { DEVICE_TYPES } from './devices/device-type';

@Injectable()
export class DeviceService {
  deviceValidation = 'http://192.168.188.147:3000/deviceNameValidation/';

  deviceUrl = 'http://192.168.188.147:3000/device/';
  // deviceUrl = 'http://192.168.99.100:3000/device/';

  selectedDevice: Idevice;

  private subjectMRA = new Subject();
  private subjectVOC = new Subject();
  private subjectLSR = new Subject();

  public observableMRA$ = this.subjectMRA.asObservable();
  public observableVOC$ = this.subjectVOC.asObservable();
  public observableLSR$ = this.subjectLSR.asObservable();

  constructor(private _http: HttpClient, private _http1: Http) {
   }

   test() {
    this.subjectMRA.next({id: '3232'});
    this.subjectVOC.next({id: '3232'});
    this.subjectLSR.next({id: '3232'});
   }

  getDevice(deviceId: string) {
    this._http.get<Idevice>(this.deviceUrl).subscribe(data => {
      console.log(data);
    });
  }

  putSelectedDevice(device: Idevice) {
    switch (DEVICE_TYPES[device.type]) {
      case DEVICE_TYPES.MRA:
      console.log('MRA');
      this.subjectMRA.next({id: device._id, type: device.type});
      break;
      case DEVICE_TYPES.LSR:
      console.log('LSR');
      this.subjectLSR.next({id: device._id, type: device.type});
      break;
      case DEVICE_TYPES.VOC:
      console.log('VOC');
      this.subjectVOC.next({id: device._id, type: device.type});
      break;
    }
  }

  verifyDeviceExists(deviceId: string, deviceName: string) {
    return this._http1.get(this.deviceValidation + deviceId + '?' + 'deviceName=' + deviceName)
      .pipe(map((res: Response) => res.json()));
  }

  // getDeviceList(): Observable<Idevice[]> {
  //   return this._http.get<Idevice[]>(this.deviceUrl).pipe(
  //     catchError(
  //       this.handleError('getDeviceList', [])
  //     ));
  // }

  getDeviceList(deviceName: string): Observable<Idevice[]> {
    let url = this.deviceUrl;
    if (deviceName != null && deviceName.trim().length > 0) {
      url = url  + '?' + 'deviceName=' + deviceName;
    }
    return this._http.get<Idevice[]>(url).pipe(
      catchError(
        this.handleError('getDeviceList', [])
      ));
  }

  getDeviceById(deviceId): Observable<Idevice> {
    return this._http.get<Idevice>(this.deviceUrl + deviceId).pipe(
      map((a) => a),
    );
  }

  createDevice(device: Idevice): Observable<Idevice> {
    return this._http.post<Idevice>(this.deviceUrl, device);
  }

  updateDevice(device: Idevice): Observable<Idevice> {
    console.log('update -> ' + device._id);
    return this._http.put<Idevice>(this.deviceUrl + device._id, device);
  }

  deleteDevice(deviceId: string): Observable<Idevice> {
    return this._http.delete<Idevice>(this.deviceUrl + deviceId);
  }

  setSelectedDevice(device: Idevice) {
    this.selectedDevice = device;
  }

  getSelectedDevice() {
    return this.selectedDevice;
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(log: string) {
    console.log(log);
  }
}
