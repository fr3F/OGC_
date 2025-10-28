import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.action';
import { User } from './user.model';

export interface UserState {
  userlist: User[];
  totalItems: number;
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  userlist: [],
  totalItems: 0,
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,

  on(UserActions.fetchlistUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(UserActions.fetchListUserSuccess, (state, { userlist, totalItems }) => ({
    ...state,
    loading: false,
    userlist,
    totalItems
  })),

  on(UserActions.fetchlistUserFail, (state, { error }) => {
    console.error('User fetch error:', error); // Journalisation pour le débogage
    return {
      ...state,
      loading: false,
      error
    };
  })
);
