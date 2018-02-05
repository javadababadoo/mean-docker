import { Idevice } from './../idevice';
import {Action} from '@ngrx/store';

export const LOADED_DEVICES = 'LOAD_DEVICES';

export class LoadDeviceAction implements Action {

  readonly type: string = LOADED_DEVICES;

  constructor(public payLoad?: Idevice[]) {

  }
}

export type UIActions = LoadDeviceAction;
