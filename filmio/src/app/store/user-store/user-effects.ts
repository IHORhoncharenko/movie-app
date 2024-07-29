import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, retry, switchMap, tap } from "rxjs/operators";
import { AuthUserService } from "../../services/users/authUser.service.service";
import * as storeActions from "./user-actions";

@Injectable()
export class UserEffects {
  requestToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.loadRequestToken),
      switchMap(() => {
        return this.authUserService.getRequestToken().pipe(
          tap(() => {
            console.log(
              `%c Loading requestToken ...`,
              `color: red; font-weight: 700`,
            );
          }),
          retry(8), //повторні 8 запитів до сереверу у випадки невдачі отримання данних
          map((data) => {
            console.log(`[data] >>> loadRequestToken$`, data);
            console.log(
              `%c requestToken >>>`,
              `color: green; font-weight: 700`,
              data.request_token,
            );
            return storeActions.loadRequestTokenSuccess({
              requestToken: data.request_token,
            });
          }),
          catchError((error) =>
            of(
              storeActions.loadUserDataFailure({
                error,
              }),
            ),
          ),
        );
      }),
    ),
  );

  validationRequestToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.loadValidRequestToken),
      switchMap((action) => {
        console.log(`[action] >>> loadValidRequestToken$`, action);
        return this.authUserService.getValidToken(action.requestToken).pipe(
          tap(() => {
            console.log(
              `%c Validation requestToken ...`,
              `color: red; font-weight: 700`,
            );
          }),
          retry(8), //повторні 8 запитів до сереверу у випадки невдачі отримання данних
          map((data) => {
            console.log(`[data] >>> loadValidRequestToken$`, data);
            console.log(
              `%c Valid requestToken >>>`,
              `color: green; font-weight: 700`,
              data.request_token,
            );
            return storeActions.loadRequestTokenSuccess({
              requestToken: data.request_token,
            });
          }),
          catchError((error) =>
            of(
              storeActions.loadUserDataFailure({
                error,
              }),
            ),
          ),
        );
      }),
    ),
  );

  userSessionId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.loadUserSessionId),
      switchMap((action) => {
        console.log(`[action] >>> loadUserSessionId$`, action);
        return this.authUserService.createSessionId(action.requestToken).pipe(
          tap(() => {
            console.log(
              `%c Create session ID ...`,
              `color: red; font-weight: 700`,
            );
          }),
          retry(8), //повторні 8 запитів до сереверу у випадки невдачі отримання данних
          map((data) => {
            console.log(`[data] >>> loadUserSessionId$`, data);
            console.log(
              `%c Created session ID >>>`,
              `color: green; font-weight: 700`,
              data.session_id,
            );
            return storeActions.loadUserSessionIdSuccess({
              sessionID: data.session_id,
            });
          }),
          catchError((error) =>
            of(
              storeActions.loadUserDataFailure({
                error,
              }),
            ),
          ),
        );
      }),
    ),
  );

  userAccountId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.loadUserAccountId),
      switchMap((action) => {
        console.log(`[action] >>> loadUserAccountId$`, action);
        return this.authUserService.getAccountId(action.sessionID).pipe(
          tap(() => {
            console.log(
              `%c Get user account ID ...`,
              `color: red; font-weight: 700`,
            );
          }),
          retry(8), //повторні 8 запитів до сереверу у випадки невдачі отримання данних
          map((data) => {
            console.log(`[data] >>> loadUserAccountId$`, data);
            console.log(
              `%c accountID >>>`,
              `color: green; font-weight: 700`,
              data.id,
            );
            return storeActions.loadUserAccountIdSuccess({
              accountID: data.id,
            });
          }),
          catchError((error) =>
            of(
              storeActions.loadUserDataFailure({
                error,
              }),
            ),
          ),
        );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private authUserService: AuthUserService,
  ) {}
}
