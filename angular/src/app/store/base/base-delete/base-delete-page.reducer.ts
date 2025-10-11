import { createReducer, on } from '@ngrx/store';
import * as BaseDeletePageActions from './base-delete-page.actions';

export interface BaseDeleteState {
  loading: boolean;
  error: any;
  deletedId: number | string | null;
  lastDeleteResponse:any
}

export const initialState: BaseDeleteState = {
  loading: false,
  error: null,
  deletedId: null,
  lastDeleteResponse:false
};

export const baseDeleteReducer = createReducer(
  initialState,

  on(BaseDeletePageActions.loadDelete, (state) => ({
    ...state,
    loading: true,
    error: null,
    deletedId: null
  })),

  on(BaseDeletePageActions.loadDeleteSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    deletedId: id,
    lastDeleteResponse: true
  })),

  on(BaseDeletePageActions.loadDeleteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
