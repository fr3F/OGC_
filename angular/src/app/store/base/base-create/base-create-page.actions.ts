import { createAction, props } from '@ngrx/store';

export const baseSave = createAction(
  '[Base] Save',
  props<{ nomModele: string; data: any; redirectUrl? }>()
);

export const baseSaveSuccess = createAction(
  '[Base] Save Success',
  props<{ nomModele: string; response: any }>()
);

export const baseSaveFailure = createAction(
  '[Base] Save Failure',
  props<{ nomModele: string; error: any }>()
);
