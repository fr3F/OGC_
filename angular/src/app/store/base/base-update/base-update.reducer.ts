import { createReducer, on } from '@ngrx/store';
import * as BaseUpdateActions from './base-update.actions';

export interface BaseUpdateState {
  list: any[];
  loading: boolean;
  error: any;
  updating: boolean;       // 👈 pour le PUT
  updateSuccess: boolean;  // 👈 pour détecter succès
}

export const initialState: BaseUpdateState = {
  list: [],
  loading: false,
  error: null,
  updating: false,
  updateSuccess: false,
};

export const BaseUpdateReducer = createReducer(
  initialState,

  // 🔥 UPDATE
  on(BaseUpdateActions.baseUpdate, (state) => ({
    ...state,
    updating: true,
    updateSuccess: false,
    error: null,
  })),

  on(BaseUpdateActions.baseUpdateSuccess, (state, { response }) => ({
    ...state,
    list: state.list.map(item => item.id === response.id ? response : item),
    updating: false,
    updateSuccess: true,
  })),

  on(BaseUpdateActions.baseUpdateFailure, (state, { error }) => ({
    ...state,
    updating: false,
    updateSuccess: false,
    error,
  })),
);
