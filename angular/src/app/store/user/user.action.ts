import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

export const fetchlistUser = createAction(
  '[User] fetch user list',
  props<{ search: string; page: number; size: number }>()
);

export const fetchListUserSuccess = createAction(
  '[User] fetch user list success',
  props<{ userlist: User[]; totalItems: number }>()
);

export const fetchlistUserFail = createAction(
  '[User] fetch user list failed',
  props<{ error: string }>()
);
