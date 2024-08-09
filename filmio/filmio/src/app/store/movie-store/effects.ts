import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, filter, map, mergeMap, retry, tap } from "rxjs/operators";
import { MoviesService } from "../../services/movies/movies.service";
import * as storeActions from "./actions";

@Injectable()
export class MovieEffects {
  movies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.loadAllMovies),
      mergeMap(() => {
        return this.moviesService.getAllMovies().pipe(
          map((allMovies) =>
            storeActions.loadMoviesSuccess({
              allMovies,
            }),
          ),
          catchError((error) =>
            of(
              storeActions.loadMoviesFailure({
                error,
              }),
            ),
          ),
        );
      }),
    ),
  );

  genresForMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.loadGenresForMovies),
      mergeMap((data) => {
        return this.moviesService.getGenresForMovies().pipe(
          retry(8),
          map((data) =>
            storeActions.loadGenresForMoviesSuccess({
              genresMovie: data,
            }),
          ),
          catchError((error) =>
            of(
              storeActions.loadMoviesFailure({
                error,
              }),
            ),
          ),
        );
      }),
    ),
  );

  popularMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.loadPopularMovies),
      mergeMap(() => {
        return this.moviesService.getPopularMovies().pipe(
          map((movies) =>
            storeActions.loadPopularMoviesSuccess({
              popularMovies: movies.results,
            }),
          ),
          catchError((error) =>
            of(
              storeActions.loadMoviesFailure({
                error,
              }),
            ),
          ),
        );
      }),
    ),
  );

  nowPlaingMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.loadNowPlaingMovies),
      mergeMap(() => {
        return this.moviesService.getNowPlayingMovies().pipe(
          map((movies) =>
            storeActions.loadNowPlaingMoviesSuccess({
              nowPlaingMovies: movies.results,
            }),
          ),
          catchError((error) =>
            of(
              storeActions.loadMoviesFailure({
                error,
              }),
            ),
          ),
        );
      }),
    ),
  );

  topRateMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.loadTopMovies),
      mergeMap(() => {
        return this.moviesService.getTopRategMovies().pipe(
          map((movies) =>
            storeActions.loadTopMoviesSuccess({
              topMovies: movies.results,
            }),
          ),
          catchError((error) =>
            of(
              storeActions.loadMoviesFailure({
                error,
              }),
            ),
          ),
        );
      }),
    ),
  );

  upcomingMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.loadUpcomingMovies),
      mergeMap(() => {
        return this.moviesService.getUpcomingMovies().pipe(
          map((movies) =>
            storeActions.loadUpcomingMoviesSuccess({
              upcomingMovies: movies.results,
            }),
          ),
          catchError((error) =>
            of(
              storeActions.loadMoviesFailure({
                error,
              }),
            ),
          ),
        );
      }),
    ),
  );

  reviewsMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.loadSelectedMovie),
      mergeMap((data) => {
        return this.moviesService
          .getReviewsAboutMovie(data.selectedMovie?.id)
          .pipe(
            map((data) =>
              storeActions.loadReviewsMovieSuccess({
                reviewsMovie: data,
              }),
            ),
            catchError((error) =>
              of(
                storeActions.loadMoviesFailure({
                  error,
                }),
              ),
            ),
          );
      }),
    ),
  );

  addfavoriteListMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.addFavoriteListMovies),
      mergeMap((action) => {
        return this.moviesService
          .addToFavorite(action.accountID, action.media_id, action.sessionID)
          .pipe(
            map(() => {
              return storeActions.addFavoriteListMoviesSuccess();
            }),
            catchError((error) =>
              of(
                storeActions.loadMoviesFailure({
                  error,
                }),
              ),
            ),
          );
      }),
    ),
  );

  addWatchListMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.addWatchListMovies),
      mergeMap((action) => {
        return this.moviesService
          .addToWatchlist(action.accountID, action.media_id, action.sessionID)
          .pipe(
            map(() => {
              return storeActions.addWatchListMoviesSuccess();
            }),
            catchError((error) =>
              of(
                storeActions.loadMoviesFailure({
                  error,
                }),
              ),
            ),
          );
      }),
    ),
  );

  removeMoviesFromFavoriteList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.removeMoviesFromFavoriteList),
      filter((action) => action.accountID !== null && action.mediaID !== null),
      mergeMap((action) =>
        this.moviesService
          .clearFavoriteList(action.accountID, action.mediaID, action.sessionID)
          .pipe(
            map(() =>
              storeActions.loadFavoriteListMovies({
                accountID: action.accountID,
                sessionID: action.sessionID,
              }),
            ),
            catchError((error) =>
              of(
                storeActions.loadMoviesFailure({
                  error,
                }),
              ),
            ),
          ),
      ),
    ),
  );

  removeMoviesFromWatchList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.removeMoviesFromWatchList),
      filter((action) => action.accountID !== null && action.mediaID !== null),
      mergeMap((action) =>
        this.moviesService
          .clearWatchlist(action.accountID, action.mediaID, action.sessionID)
          .pipe(
            map(() =>
              storeActions.loadWatchListMovies({
                accountID: action.accountID,
                sessionID: action.sessionID,
              }),
            ),
            catchError((error) =>
              of(
                storeActions.loadMoviesFailure({
                  error,
                }),
              ),
            ),
          ),
      ),
    ),
  );

  loadFavoriteListMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.loadFavoriteListMovies),
      filter((action) => action.accountID !== null),
      mergeMap((action) => {
        return this.moviesService
          .getFavoriteMovies(action.accountID, action.sessionID)
          .pipe(
            tap(() => {
              console.log(
                `%c Get favorite movies ...`,
                `color: red; font-weight: 700`,
              );
            }),
            retry(8),
            map((data) => {
              console.log(`[data] >>> loadFavoriteListMovies$`, data);
              console.log(
                `%c favoriteListMovies >>>`,
                `color: green; font-weight: 700`,
                data.results,
              );
              return storeActions.loadFavoriteListMoviesSuccess({
                favoriteMovies: data.results,
              });
            }),
            catchError((error) =>
              of(
                storeActions.loadMoviesFailure({
                  error,
                }),
              ),
            ),
          );
      }),
    ),
  );

  loadWatchListMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.loadWatchListMovies),
      filter((action) => action.accountID !== null),
      mergeMap((action) => {
        return this.moviesService
          .getWatchlistMovies(action.accountID, action.sessionID)
          .pipe(
            tap(() => {
              console.log(
                `%c Get watchlist movies ...`,
                `color: red; font-weight: 700`,
              );
            }),
            retry(8),
            map((data) => {
              console.log(`[data] >>> loadWatchListMovies$`, data);
              console.log(
                `%c loadWatchListMovies >>>`,
                `color: green; font-weight: 700`,
                data.results,
              );
              return storeActions.loadWatchListMoviesSuccess({
                watchlistMovies: data.results,
              });
            }),
            catchError((error) =>
              of(
                storeActions.loadMoviesFailure({
                  error,
                }),
              ),
            ),
          );
      }),
    ),
  );

  addSearchMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.addSearchMovies),
      filter((action) => action.searchMovie !== null),
      map((action) => {
        return storeActions.addSearchMoviesSuccess({
          searchMovie: action.searchMovie,
        });
      }),
      catchError((error) =>
        of(
          storeActions.loadMoviesFailure({
            error,
          }),
        ),
      ),
    ),
  );

  deleteSearchMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.deleteSearchMovies),
      map(() => {
        return storeActions.deleteSearchMoviesSuccess({
          searchMovie: null,
        });
      }),
      catchError((error) =>
        of(
          storeActions.loadMoviesFailure({
            error,
          }),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService,
    private store: Store,
  ) {}
}
