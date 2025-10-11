import { createAction, props } from '@ngrx/store';

export const filterList = createAction(
  '[BaseListPage] Filter List',
  props<{ nomModele:string, searchTerm: string }>()
)
export const loadList = createAction(
  '[BaseListPage] Load List',
  props<{ nomModele: string; params: any, status?: number}>() 
);

export const loadListSuccess = createAction(
  '[BaseListPage] Load List Success',
  props<{ nomModele:string, data: any[], totalItems: number }>()
);

export const loadListFailure = createAction(
  '[BaseListPage] Load List Failure',
  props<{ nomModele:string, error: any }>()
);

export const triggerReloadChildData = createAction(
  '[BaseListPage] Trigger Reload Child Data',
  props<{ nomModele: string }>() 
);
