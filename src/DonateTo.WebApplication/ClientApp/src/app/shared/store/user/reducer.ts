import * as userActions from './actions';
import { Action, createReducer, on } from '@ngrx/store';
import { PageModel, UserModel } from '../../models';

export interface UserState {
  loading: boolean;
  failed: boolean;
  items: UserModel[];
  pagedItems: PageModel<UserModel>;
}

const INITIAL_STATE: UserState = {
  loading: false,
  failed: false,
  items: [],
  pagedItems: new PageModel<UserModel>(),
};

const userReducer = createReducer(
  INITIAL_STATE,
  on(userActions.userOrganizationLink, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(userActions.userOrganizationLinkSuccess, (state) => ({
    ...state,
    loading: false,
    failed: false,
  })),
  on(userActions.userOrganizationLinkFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
    items: [],
  })),
  on(userActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(userActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    failed: false,
    items: users,
  })),
  on(userActions.loadUsersFailed, (state) => ({
    ...state,
    loading: false,
    failed: false,
    items: [],
  })),
  on(userActions.loadUsersPaged, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(userActions.loadUsersPagedSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    failed: false,
    pagedItems: users,
  })),
  on(userActions.loadUsersPagedFailed, (state) => ({
    ...state,
    loading: false,
    failed: false,
    items: [],
  }))
);

export function reducer(state: UserState, action: Action) {
  return userReducer(state, action);
}
