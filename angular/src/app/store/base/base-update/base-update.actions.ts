import { createAction, props } from '@ngrx/store';

export const baseUpdate = createAction(
  '[Base List] Update',
  props<{ data: any, nomModele?: string , redirectUrl?}>()
);

export const baseUpdateSuccess = createAction(
  '[Base List] Update Success',
  props<{ nomModele, response: any }>()
);

export const baseUpdateFailure = createAction(
  '[Base List] Update Failure',
  props<{ nomModele,error: any }>()
);
