import { UiState, uiReducer, getCurrentDeviceId } from './store/reducers/ui-reducer';
import { StoreData, storeReducer, getDevices } from './store/reducers/store-reducer';
import { ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import { createSelector } from '@ngrx/store';

export interface ApplicationState {
  uiState: UiState;
  storeData: StoreData;
}

export const reducers: ActionReducerMap<ApplicationState> = {
  uiState: uiReducer,
  storeData: storeReducer,
};

export const getUiState = createFeatureSelector<UiState>('uiState');
export const getStoreData = createFeatureSelector<StoreData>('storeData');
export const getCurrentDeviceIdSelector = createSelector(getUiState, getCurrentDeviceId);
export const getDevicesSelector = createSelector(getStoreData, getDevices);
