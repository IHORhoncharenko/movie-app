import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user-state";

export const selectState = createFeatureSelector<UserState>("userState");

export const selectorGetRequestToken = createSelector(
  selectState,
  (state) => state.requestToken,
);
export const selectorGetSessionId = createSelector(
  selectState,
  (state) => state.sessionID,
);
export const selectorGetAccountId = createSelector(
  selectState,
  (state) => state.accountId,
);
