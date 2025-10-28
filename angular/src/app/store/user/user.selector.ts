import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUserList = createSelector(
  selectUserState,
  (state: UserState) => state.userlist
);

export const selectTotalItems = createSelector(
  selectUserState,
  (state: UserState) => state.totalItems
);

export const selectLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);


