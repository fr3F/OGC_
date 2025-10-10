import { createReducer,on } from "@ngrx/store";
import { MenuItem } from "./menu.model";
import * as MenuActions from './menu.actions';

export interface Menustate {
  Menus: MenuItem[];
  loading: boolean;
  error: any;
}

export const initialState: Menustate = {
  Menus: [],
  loading: false,
  error: null
};

export const MenuReducer = createReducer(
  initialState,
  on(MenuActions.loadMenus, (state) => ({...state,loading: true,error: null})),
  on(MenuActions.loadMenusSuccess, (state, { Menus }) => ({...state,Menus,loading: false,error: null})),
  on(MenuActions.loadMenusFailure, (state, { error }) => ({...state,loading: false,error}))
);

