import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user-state";

export const selectState = createFeatureSelector<UserState>("userState");

export const selectRequestToken = createSelector(
  selectState,
  (state) => state.requestToken,
);
export const selectValidRequestToken = createSelector(
  selectState,
  (state) => state.requestToken,
);
export const selectSessionId = createSelector(
  selectState,
  (state) => state.sessionID,
);
export const selectAccountId = createSelector(
  selectState,
  (state) => state.accountID,
);
