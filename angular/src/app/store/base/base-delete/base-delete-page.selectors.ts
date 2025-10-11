import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDelete from './base-delete-page.reducer';

export const selectDeleteState = createFeatureSelector<fromDelete.BaseDeleteState>('baseDelete');

export const selectDeleteLoading = createSelector(
  selectDeleteState,
  (state) => state.loading
);

export const selectDeleteError = createSelector(
  selectDeleteState,
  (state) => state.error
);

export const selectDeletedId = createSelector(
  selectDeleteState,
  (state) => state.deletedId
);

export const selectLastDeleteResponse = createSelector(
  selectDeleteState,
  (state) => state.lastDeleteResponse
);