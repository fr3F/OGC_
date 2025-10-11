import { createAction, props } from '@ngrx/store';
import { MenuItem } from './menu.model';

// Charger les produits
export const loadMenus = createAction('[Product] Load Menus');

// Succès du chargement
export const loadMenusSuccess = createAction(
  '[Product] Load Menus Success',
  props<{ Menus: MenuItem[] }>()
);

// Erreur chargement
export const loadMenusFailure = createAction(
  '[Product] Load Menus Failure',
  props<{ error: any }>()
);
