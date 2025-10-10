import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBaseList from './base-list-page.reducer';

export const BaseListPageState = createFeatureSelector<fromBaseList.BaseListState>('baseListPage');

export const selectList = createSelector(
  BaseListPageState,
  (state) => state.list
);

export const selectLoading = createSelector(
  BaseListPageState,
  (state) => state.loading
);

export const selectTotalItems = createSelector(
  BaseListPageState,
  (state) => state.totalItems
);

export const selectTotalItemsByNomModele = (nomModele: string) =>
  createSelector(BaseListPageState, (state) => {
    const total = state[nomModele]?.totalItems ?? 0;
    console.log(`Selector totalItems pour "${nomModele}" = ${total}`);
    return total;
});

export const selectError = createSelector(
  BaseListPageState,
  (state) => state.error
);

export const selectFilteredList = createSelector(
  BaseListPageState,
  (state: fromBaseList.BaseListState) => state.filteredList
);

export const selectSearchTerm = createSelector(
  BaseListPageState,
  (state: fromBaseList.BaseListState) => state.searchTerm
);

// selectList By NomModele
export const selectListByNomModele = (nomModele: string) =>
  createSelector(BaseListPageState, (state) =>
    state[nomModele]?.list || []
);

export const selectLoadingByNomModele = (nomModele: string) =>
  createSelector(BaseListPageState, (state) =>
    state[nomModele]?.loading || false
  );
  
export const selectErrorByNomModele = (nomModele: string) =>
  createSelector( BaseListPageState, (state) => 
    state[nomModele]?.error
);
