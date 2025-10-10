import { ActionReducerMap } from "@ngrx/store";

import { AuthenticationState, authenticationReducer } from "./Authentication/authentication.reducer";


import { MenuReducer, Menustate } from './menu/menu.reducer';
import { layoutReducer, LayoutState } from "./layouts/layouts.reducer";
import { baseListReducer, BaseListState } from "./base/base-liste/base-list-page.reducer";
import { BaseCreateEffects } from "./base/base-create/base-create-page.effects";
import { baseReducer, BaseState } from "./base/base-create/base-create-page.reducer";


export interface RootReducerState {
    layout: LayoutState;
    auth: AuthenticationState;
    menuList:Menustate,
    baseListPage:BaseListState,
    baseCreate:BaseState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
    layout: layoutReducer,
    auth: authenticationReducer,
    menuList: MenuReducer,
    baseListPage: baseListReducer,
    baseCreate: baseReducer
  }
