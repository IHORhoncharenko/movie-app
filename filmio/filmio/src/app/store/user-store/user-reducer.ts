import { createReducer, on } from "@ngrx/store";
import * as storeActions from "../user-store/user-actions";
import { initialState } from "./user-state";

export const UserReducer = createReducer(
  initialState,
  on(storeActions.loadRequestTokenSuccess, (state, { requestToken }) => {
    return {
      ...state,
      requestToken: requestToken,
    };
  }),
  on(storeActions.loadUserSessionIdSuccess, (state, { sessionID }) => {
    return {
      ...state,
      sessionID: sessionID,
    };
  }),
  on(storeActions.loadUserAccountIdSuccess, (state, { accountID }) => {
    return {
      ...state,
      accountID: accountID,
    };
  }),
  on(storeActions.loadSubscribeDataUserSuccess, (state, { subscribe }) => {
    return {
      ...state,
      subscribe: subscribe,
    };
  }),
  on(storeActions.deleteSubscribeDataUserSuccess, (state, { subscribe }) => {
    return {
      ...state,
      subscribe: subscribe,
    };
  }),
);
