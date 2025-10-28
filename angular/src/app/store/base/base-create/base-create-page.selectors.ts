import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BaseState } from './base-create-page.reducer';

export const selectBaseState = createFeatureSelector<BaseState>('baseCreate');

// Sélecteur pour récupérer l’état d’un modèle donné
export const selectModelState = (nomModele: string) =>
  createSelector(selectBaseState, (state) =>
    state[nomModele] || { loading: false, error: null, success: false } // fallback complet
  );


// Sélecteur pour savoir si le modèle est en cours de save/update/delete
export const selectModelLoading = (nomModele: string) =>
  createSelector(selectModelState(nomModele), (modelState) => modelState.loading);

// Sélecteur pour récupérer l’erreur du modèle
export const selectModelError = (nomModele: string) =>
  createSelector(selectModelState(nomModele), (modelState) => modelState.error);

export const selectModelSuccess = (nomModele: string) =>
  createSelector(selectModelState(nomModele), (modelState) => modelState.success);

