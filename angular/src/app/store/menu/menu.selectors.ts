import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Menustate } from './menu.reducer';

// Sélecteur global
export const selectMenuState = createFeatureSelector<Menustate>('menuList');

// Liste produits
export const selectAllMenus = createSelector(
  selectMenuState,
  (state) => state.Menus
);

// Chargement en cours
export const selectLoading = createSelector(
  selectMenuState,
  (state) => state.loading
);

// Erreur éventuelle
export const selectError = createSelector(
  selectMenuState,
  (state) => state.error
);

