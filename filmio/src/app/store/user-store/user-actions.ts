import { createAction, props } from "@ngrx/store";
import { Subscribe } from "../../models/subscribe.models";

export const loadRequestToken = createAction(
  "[User Autentification] Get Request Token",
);
export const loadRequestTokenSuccess = createAction(
  "[User Autentification] Get Request Token Success",
  props<{ requestToken: any | null | void }>(),
);
export const loadValidRequestToken = createAction(
  "[User Autentification] Get Valid Request Token",
  props<{
    requestToken: any | null;
  }>(),
);
export const loadValidRequestTokenSuccess = createAction(
  "[User Autentification] Get Valid Request Token Success",
  props<{
    requestToken: any | null;
  }>(),
);
export const loadUserSessionId = createAction(
  "[User Autentification] Get SessionId",
  props<{
    requestToken: any | null;
  }>(),
);
export const loadUserSessionIdSuccess = createAction(
  "[User Autentification] Get SessionId Success",
  props<{ sessionID: any | null }>(),
);
export const loadUserAccountId = createAction(
  "[User Autentification] Get AccountId",
  props<{
    sessionID: any | null;
  }>(),
);
export const loadSubscribeDataUser = createAction(
  "[User Subscribe] Get user data",
  props<{ subscribe: Subscribe | null }>(),
);
export const loadSubscribeDataUserSuccess = createAction(
  "[User Subscribe] Get user data Success",
  props<{ subscribe: Subscribe | null }>(),
);
export const deleteSubscribeDataUser = createAction(
  "[User Subscribe] Delete user data",
);
export const deleteSubscribeDataUserSuccess = createAction(
  "[User Subscribe] Delete user data Success",
  props<{ subscribe: Subscribe | null }>(),
);
export const loadUserAccountIdSuccess = createAction(
  "[User Autentification] Get AccountId Success",
  props<{ accountID: any | null }>(),
);
export const loadUserDataFailure = createAction(
  "[User Autentification] User Autentification Failure",
  props<{ error: any }>(),
);
