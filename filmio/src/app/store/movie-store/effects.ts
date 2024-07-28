import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { MoviesService } from "../../services/movies/movies.service";
import * as storeActions from "./actions";

@Injectable()
export class MovieEffects {
  loadMovies$ = createEffect(() =>
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

  loadPopularMovies$ = createEffect(() =>
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

  loadNowPlaingMovies$ = createEffect(() =>
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

  loadTopMovies$ = createEffect(() =>
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

  loadUpcomingMovies$ = createEffect(() =>
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

  loadReviewsMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.selectedMovie),
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

  addToFavoriteMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.addToFavoriteMovies),
      mergeMap((data) => {
        return this.moviesService
          .addToFavorite(data.acountId, data.movieId)
          .pipe(
            map((data) => storeActions.addToFavoriteMoviesSuccess()),
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

  getFavoriteMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.getFavoriteMovies),
      mergeMap((data) => {
        return this.moviesService.getFavoriteMovies(data.acountId).pipe(
          map((data) =>
            storeActions.getFavoriteMoviesSuccess({
              favoriteMovies: data,
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

  setFavoriteMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.setFavoriteMovies),
      mergeMap((data) => {
        return this.moviesService
          .clearMovieFromFavoriteList(data.accountID, data.media_ids)
          .pipe(
            map((data) =>
              storeActions.setFavoriteMoviesSuccess({
                favoriteMovies: data,
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

  addToWatchlistMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.addToWatchlistMovies),
      mergeMap((data) => {
        return this.moviesService
          .addToWatchlist(data.acountId, data.movieId)
          .pipe(
            map((data) => storeActions.addToWatchlistMoviesSuccess()),
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

  getWatchlistMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.getWatchlistMovies),
      mergeMap((data) => {
        return this.moviesService.getWatchlistMovies(data.acountId).pipe(
          map((data) =>
            storeActions.getWatchlistMoviesSuccess({
              watchlistMovies: data,
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

  setWatchlistMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.setWatchlistMovies),
      mergeMap((data) => {
        return this.moviesService
          .clearMovieFromWatchlist(data.accountID, data.media_ids)
          .pipe(
            map((data) =>
              storeActions.setWatchlistMoviesSuccess({
                watchlistMovies: data,
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

  getGenresForMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.getGenresForMovies),
      mergeMap((data) => {
        return this.moviesService.getGenresForMovies().pipe(
          map((data) =>
            storeActions.getGenresForMoviesSuccess({
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

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService,
  ) {}
}
