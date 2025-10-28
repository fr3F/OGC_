import { ActionReducerMap } from "@ngrx/store";

import { AuthenticationState, authenticationReducer } from "./Authentication/authentication.reducer";


import { MenuReducer, Menustate } from './menu/menu.reducer';
import { layoutReducer, LayoutState } from "./layouts/layouts.reducer";
import { baseReducer, BaseState } from "./base/base-create/base-create-page.reducer";
import { baseListReducer, BaseListState } from "./base/base-liste/base-list-page.reducer";
import { BaseUpdateReducer, BaseUpdateState } from "./base/base-update/base-update.reducer";
import { baseDeleteReducer, BaseDeleteState } from "./base/base-delete/base-delete-page.reducer";
import { userReducer, UserState } from "./user/user.reducer";


export interface RootReducerState {
    layout: LayoutState;
    auth: AuthenticationState;
    menuList:Menustate,
    baseListPage:BaseListState,
    baseCreate:BaseState,
    baseUpdate:BaseUpdateState,
    baseDelete:BaseDeleteState,
    user : UserState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
    layout: layoutReducer,
    auth: authenticationReducer,
    menuList:MenuReducer,
    baseListPage:baseListReducer ,
    baseCreate: baseReducer,
    baseUpdate: BaseUpdateReducer,
    baseDelete: baseDeleteReducer,
    user : userReducer
  }
