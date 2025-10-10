import { createReducer, on } from '@ngrx/store';
import { baseSave, baseSaveFailure, baseSaveSuccess } from './base-create-page.actions';

export interface BaseState {
  [nomModele: string]: {
    loading: boolean;
    error: any;
    success: boolean;
  };
}

const initialState: BaseState = {};

export const baseReducer = createReducer(
  initialState,
  on(baseSave, (state, { nomModele }) => ({
    ...state,
    [nomModele]: { loading: true, error: null , success: false}
  })),
  on(baseSaveSuccess, (state, { nomModele }) => ({
    ...state,
    [nomModele]: { loading: false, error: null, success: true }
  })),
  on(baseSaveFailure, (state, { nomModele, error }) => ({
    ...state,
    [nomModele]: { loading: false, error , success: false}
  }))
);
