import { createAction, props } from '@ngrx/store';

// Supprimer un élément
export const loadDelete = createAction(
  '[Base Delete Page] Delete',
  props<{ nomModele: string; id: number | string }>()
);

export const loadDeleteSuccess = createAction(
  '[Base Delete Page] Delete Success',
  props<{ nomModele: string, id: number | string }>() // On renvoie juste l'id supprimé
);

export const loadDeleteFailure = createAction(
  '[Base Delete Page] Delete Failure',
  props<{ error: any }>()
);

export const resetReloadFlag = createAction(
  '[BaseDeletePage] Reset Reload Flag',
  props<{ nomModele: string }>()
);
