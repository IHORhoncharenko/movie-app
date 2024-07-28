import { createReducer, on } from "@ngrx/store";
import * as storeActions from "../user-store/user-actions";
import { initialState } from "./user-state";

export const UserReducer = createReducer(
  initialState,
  on(storeActions.getRequestTokenSuccess, (state, { requestToken }) => {
    return {
      ...state,
      requestToken: requestToken.request_token,
    };
  }),
  on(storeActions.getUserSessionIdSuccess, (state, { sessionID }) => {
    return {
      ...state,
      sessionID: sessionID.session_id,
    };
  }),
  on(storeActions.getUserAccountIdSuccess, (state, { accountId }) => {
    return {
      ...state,
      accountId: accountId.id,
    };
  }),
);
