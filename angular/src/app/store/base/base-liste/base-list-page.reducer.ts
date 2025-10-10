import { createReducer, on } from '@ngrx/store';
import * as BaseListPageActions from './base-list-page.actions';

export interface BaseListState {
  [nomModele: string]: {
    list: any[];
    loading: boolean;
    error: any;
    totalItems: number;
    filteredList: any[];
    searchTerm: string;
    reloadFlag: boolean;
  };
}

export const initialState: BaseListState = {};

const getNomModeleState = (state: BaseListState, nomModele: string) => ({
  list: state[nomModele]?.list ?? [],
  loading: state[nomModele]?.loading ?? false,
  error: state[nomModele]?.error ?? null,
  totalItems: state[nomModele]?.totalItems ?? 0,
  filteredList: state[nomModele]?.filteredList ?? [],
  searchTerm: state[nomModele]?.searchTerm ?? '',
  reloadFlag: state[nomModele]?.reloadFlag ?? false
});

export const baseListReducer = createReducer(
  initialState,

  on(BaseListPageActions.triggerReloadChildData, (state, { nomModele }) => ({
    ...state,
    [nomModele]: {
      ...getNomModeleState(state, nomModele),
      reloadFlag: true
    }
  })),

  on(BaseListPageActions.loadList, (state, { nomModele }) => ({
    ...state,
    [nomModele]: {
      ...getNomModeleState(state, nomModele),
      loading: true,
      error: null
    }
  })),

  on(BaseListPageActions.loadListSuccess, (state, { nomModele, data, totalItems }) => ({
    ...state,
    [nomModele]: {
      ...getNomModeleState(state, nomModele),
      list: data,
      totalItems: totalItems ?? state[nomModele]?.totalItems ?? 0,
      loading: false,
      reloadFlag: false
    }
  })),

  on(BaseListPageActions.loadListFailure, (state, { nomModele, error }) => ({
    ...state,
    [nomModele]: {
      ...getNomModeleState(state, nomModele),
      error,
      loading: false
    }
  })),

  on(BaseListPageActions.filterList, (state, { nomModele, searchTerm }) => {
    const currentState = getNomModeleState(state, nomModele);
    const filtered = currentState.list.filter(item =>
      !searchTerm || item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return {
      ...state,
      [nomModele]: {
        ...currentState,
        filteredList: filtered,
        searchTerm
      }
    };
  })
);
