import { StoreData } from './store-reducer';
import { Action } from '@ngrx/store';
import { UIActions, LOADED_DEVICES, LoadDeviceAction } from './../actions';
import { Idevice } from '../../idevice';
import * as _ from 'lodash';

export interface StoreData {
  devices: {[key: number]: Idevice};
}

export const INITIAL_STORE_DATA: StoreData = {
  devices: {}
};

export function storeReducer(state: StoreData = INITIAL_STORE_DATA, action: Action): StoreData {
  console.log('uiStore --> ' + state);
  switch (action.type) {
    case LOADED_DEVICES:
      return handleLoadedDevicesAction(state, action);
    default:
      return state;
  }
}

function handleLoadedDevicesAction(state: StoreData, action: LoadDeviceAction): StoreData {
  // console.log('handleLoadedDevicesAction');
  return {
    devices: _.keyBy(action.payLoad, '_id')
  };
}

export const getDevices = (state: StoreData) => state.devices;

