import { createAction, props } from "@ngrx/store";
import { Movie } from "../../models/movie.models";

export const loadSelectedMovie = createAction(
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

export const loadReview = createAction("[Review] Load Review");
export const loadReviewsFailure = createAction(
  "[Review] Load Review Failure",
  props<{ error: any }>(),
);
export const loadReviewsMovieSuccess = createAction(
  "[Reviews] Load Reviews Movies Success",
  props<{ reviewsMovie: any }>(),
);

export const addWatchListMovies = createAction(
  "[Movie] Adding movie to watchlist",
  props<{
    accountID: string;
    media_id: number;
  }>(),
);
export const addWatchListMoviesSuccess = createAction(
  "[Movie] Adding movie to watchlist Success",
);
export const loadWatchListMovies = createAction(
  "[Movie] Download the list of movies to watch",
  props<{
    accountID: any | null;
  }>(),
);
export const loadWatchListMoviesSuccess = createAction(
  "[Movie] Download the list of movies to watch Success",
  props<{
    watchlistMovies: Movie[] | null;
  }>(),
);
export const removeMoviesFromWatchList = createAction(
  "[Movie] Remove the list of movies to watch",
  props<{
    accountID: any | null;
    mediaID: any | null;
  }>(),
);

export const addFavoriteListMovies = createAction(
  "[Movie] Adding movie to favorites list",
  props<{
    accountID: string;
    media_id: number;
  }>(),
);
export const addFavoriteListMoviesSuccess = createAction(
  "[Movie] Adding movie to favorites list Success",
);
export const loadFavoriteListMovies = createAction(
  "[Movie] Downloading movies from the favorites list",
  props<{
    accountID: any | null;
  }>(),
);
export const loadFavoriteListMoviesSuccess = createAction(
  "[Movie] Downloading movies from the favorites list Success",
  props<{
    favoriteMovies: Movie[] | null;
  }>(),
);
export const removeMoviesFromFavoriteList = createAction(
  "[Movie] Remove movies from the favorites list",
  props<{
    accountID: any | null;
    mediaID: any | null;
  }>(),
);

export const addSearchMovies = createAction(
  "[Movie] Adding search movie",
  props<{
    searchMovie: string;
  }>(),
);
export const addSearchMoviesSuccess = createAction(
  "[Movie] Adding search movie Success",
  props<{
    searchMovie: string;
  }>(),
);

export const loadMoviesFailure = createAction(
  "[Movie] Load Moviess Failure",
  props<{ error: any }>(),
);
