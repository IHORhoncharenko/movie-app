import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { AuthUserService } from "../../services/users/authUser.service.service";
import * as storeActions from "./user-actions";

@Injectable()
export class UserEffects {
  getRequestToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.getRequestToken),
      mergeMap(() => {
        return this.authUserService.getRequestToken().pipe(
          map((data) =>
            storeActions.getRequestTokenSuccess({
              requestToken: data,
            }),
          ),
          catchError((error) =>
            of(
              storeActions.getUserDataFailure({
                error,
              }),
            ),
          ),
        );
      }),
    ),
  );

  getValidRequestToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.getValidRequestToken),
      mergeMap((data) => {
        return this.authUserService.getValidToken(data?.requestToken).pipe(
          map(() => storeActions.getValidRequestTokenSuccess()),
          catchError((error) =>
            of(
              storeActions.getUserDataFailure({
                error,
              }),
            ),
          ),
        );
      }),
    ),
  );

  getUserSessionId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.getUserSessionId),
      mergeMap((data) => {
        return this.authUserService.createSessionId(data.requestToken).pipe(
          map((data) =>
            storeActions.getUserSessionIdSuccess({
              sessionID: data,
            }),
          ),
          catchError((error) =>
            of(
              storeActions.getUserDataFailure({
                error,
              }),
            ),
          ),
        );
      }),
    ),
  );

  getUserAccountId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.getUserAccountId),
      mergeMap((data) => {
        return this.authUserService.getAccountId(data.sessionID).pipe(
          map((data) =>
            storeActions.getUserAccountIdSuccess({
              accountId: data,
            }),
          ),
          catchError((error) =>
            of(
              storeActions.getUserDataFailure({
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
