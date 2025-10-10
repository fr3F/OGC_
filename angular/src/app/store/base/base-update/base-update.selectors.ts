import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BaseUpdateState } from './base-update.reducer';

export const selectBaseUpdateState = createFeatureSelector<BaseUpdateState>('baseUpdate');

export const selectUpdating = createSelector(
  selectBaseUpdateState,
  (state: BaseUpdateState) => state.updating
);

export const selectUpdateSuccess = createSelector(
  selectBaseUpdateState,
  (state: BaseUpdateState) => state.updateSuccess
);

export const selectUpdateError = createSelector(
  selectBaseUpdateState,
  (state: BaseUpdateState) => state.error
);
