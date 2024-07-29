import { createAction, props } from "@ngrx/store";
import { Movie } from "../../models/movie.models";

export const selectedMovie = createAction(
  "[Movie] Selected Movie",
  props<{ selectedMovie: Movie | null }>(),
);
export const loadGenresForMovies = createAction(
  "[Genres] Get Genres For Movies",
);
export const loadGenresForMoviesSuccess = createAction(
  "[Genres] Get Genres For Movies Success",
  props<{ genresMovie: any | null }>(),
);
export const loadAllMovies = createAction("[Movie] Load All Movies");
export const loadMoviesSuccess = createAction(
  "[Movie] Load All Movies Success",
  props<{ allMovies: Movie[] | null }>(),
);
export const loadNowPlaingMovies = createAction(
  "[Movie] Load Now Plaing Movies",
);
export const loadNowPlaingMoviesSuccess = createAction(
  "[Movie] Load Now Plaing Movies Success",
  props<{ nowPlaingMovies: Movie[] | null }>(),
);
export const loadPopularMovies = createAction("[Movie] Load Popular Movies");
export const loadPopularMoviesSuccess = createAction(
  "[Movie] Load Popular Movies Success",
  props<{ popularMovies: Movie[] | null }>(),
);
export const loadTopMovies = createAction("[Movie] Load Top Rate Movies");
export const loadTopMoviesSuccess = createAction(
  "[Movie] Load Top Movies Success",
  props<{ topMovies: Movie[] | null }>(),
);
export const loadUpcomingMovies = createAction("[Movie] Load Upcoming Movies");
export const loadUpcomingMoviesSuccess = createAction(
  "[Movie] Load Upcoming Movies Success",
  props<{ upcomingMovies: Movie[] | null }>(),
);
export const addToFavoriteMovies = createAction(
  "[Movie] Add To Favorite Movies",
  props<{
    movieId: any | null;
    acountId: any | null;
  }>(),
);
export const addToFavoriteMoviesSuccess = createAction(
  "[Movie] Add To Favorite Movies Success",
);
export const getFavoriteMovies = createAction(
  "[Movie] Get Favorite Movies",
  props<{ acountId: any | null }>(),
);
export const getFavoriteMoviesSuccess = createAction(
  "[Movie] Get Favorite Movies Success",
  props<{ favoriteMovies: any | null }>(),
);
export const setFavoriteMovies = createAction(
  "[Movie] Set Favorite Movies",
  props<{
    accountID: any | null;
    media_ids: any | null;
  }>(),
);
export const setFavoriteMoviesSuccess = createAction(
  "[Movie] Set Favorite Movies Success",
  props<{ favoriteMovies: any | null }>(),
);
export const addToWatchlistMovies = createAction(
  "[Movie] Add To Watchlist Movies",
  props<{
    movieId: any | null;
    acountId: any | null;
  }>(),
);
export const addToWatchlistMoviesSuccess = createAction(
  "[Movie] Add To Watchlist Movies Success",
);
export const getWatchlistMovies = createAction(
  "[Movie] Get Watchlist Movies",
  props<{ acountId: any | null }>(),
);
export const getWatchlistMoviesSuccess = createAction(
  "[Movie] Get Watchlist Movies Success",
  props<{ watchlistMovies: any | null }>(),
);
export const setWatchlistMovies = createAction(
  "[Movie] Set Watchlist Movies",
  props<{
    accountID: any | null;
    media_ids: any | null;
  }>(),
);
export const setWatchlistMoviesSuccess = createAction(
  "[Movie] Set Watchlist Movies Success",
  props<{ watchlistMovies: any | null }>(),
);
export const loadReview = createAction("[Review] Load Review");
export const loadMoviesFailure = createAction(
  "[Movie] Load Moviess Failure",
  props<{ error: any }>(),
);
export const loadReviewsFailure = createAction(
  "[Review] Load Review Failure",
  props<{ error: any }>(),
);
export const loadReviewsMovieSuccess = createAction(
  "[Reviews] Load Reviews Movies Success",
  props<{ reviewsMovie: any }>(),
);
