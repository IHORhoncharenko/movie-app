import { createAction, props } from "@ngrx/store";

export const getRequestToken = createAction(
  "[User Autentification] Get Request Token",
);
export const getRequestTokenSuccess = createAction(
  "[User Autentification] Get Request Token Success",
  props<{ requestToken: any | null | void }>(),
);
export const getValidRequestToken = createAction(
  "[User Autentification] Get Valid Request Token",
  props<{
    requestToken: any | null;
  }>(),
);
export const getValidRequestTokenSuccess = createAction(
  "[User Autentification] Get Valid Request Token Success",
);
export const getUserSessionId = createAction(
  "[User Autentification] Get SessionId",
  props<{
    requestToken: any | null;
  }>(),
);
export const getUserSessionIdSuccess = createAction(
  "[User Autentification] Get SessionId Success",
  props<{ sessionID: any | null }>(),
);
export const getUserAccountId = createAction(
  "[User Autentification] Get AccountId",
  props<{
    sessionID: any | null;
  }>(),
);
export const getUserAccountIdSuccess = createAction(
  "[User Autentification] Get AccountId Success",
  props<{ accountId: any | null }>(),
);
export const getUserDataFailure = createAction(
  "[User Autentification] User Autentification Failure",
  props<{ error: any }>(),
);
