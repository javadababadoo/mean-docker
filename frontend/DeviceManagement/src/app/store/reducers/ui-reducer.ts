import { UIActions } from './../actions';
import { Action } from '@ngrx/store';

export interface UiState {
  currentDeviceId: number;
}

export const INITIAL_UI_STATE: UiState = {
  currentDeviceId: undefined
};

export function uiReducer(state: UiState = INITIAL_UI_STATE, action: Action): UiState {
  console.log('uiState --> ' + state);
  switch (action.type) {
    default:
      return state;
  }
}

export const getCurrentDeviceId = (state: UiState) => state.currentDeviceId;
