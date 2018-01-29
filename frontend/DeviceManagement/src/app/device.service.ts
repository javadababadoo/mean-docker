import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response, Http } from '@angular/http';
import { Observable, } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { Idevice } from './idevice';
import { of } from 'rxjs/observable/of';
import 'rxjs/operators';

@Injectable()
export class DeviceService {

  deviceValidation = 'http://192.168.188.147:3000/deviceNameValidation/';

  deviceUrl = 'http://192.168.188.147:3000/device/';
  // deviceUrl = 'http://192.168.99.100:3000/device/';

  selectedDevice: Idevice;

  constructor(private _http: HttpClient, private _http1: Http) { }

  getDevice(deviceId: string) {
    this._http.get<Idevice>(this.deviceUrl).subscribe(data => {
      console.log(data);
    });
  }

  verifyDeviceExists(deviceId: string, deviceName: string) {
    return this._http1.get(this.deviceValidation + deviceId + '?' + 'deviceName=' + deviceName)
    .pipe(map((res: Response) => res.json()));
  }

  getDeviceList(): Observable<Idevice[]> {
    return this._http.get<Idevice[]>(this.deviceUrl).pipe(
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
