import { createAction, props } from "@ngrx/store";
import { Movie } from "../../models/movie.models";

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
//favorite
export const addToFavoriteMovies = createAction(
  "[Movie] Add To Favorite",
  props<{
    movieId: any | null;
    acountId: any | null;
  }>(),
);
export const addToFavoriteMoviesSuccess = createAction(
  "[Movie] Add To Favorite Success",
);
export const getFavoriteMovies = createAction(
  "[Movie] Get Favorite Movies",
  props<{ acountId: any | null }>(),
);
export const getFavoriteMoviesSuccess = createAction(
  "[Movie] Get Favorite Movies Success",
  props<{ favoriteMovies: any | null }>(),
);

export const addToWatchlistMovies = createAction("[Movie] Add To Watchlist");
export const addToWatchlistMoviesSuccess = createAction(
  "[Movie] Add To Watchlist Movies",
  props<{ watchlistMovies: Movie[] | null }>(),
);
export const selectedMovie = createAction(
  "[Movie] Set to Selected Movie",
  props<{ selectedMovie: Movie | null }>(),
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

export const loadWatchlistMoviesSuccess = createAction(
  "[Movie] Load Watchlist Movies Success",
  props<{ watchlistMovies: Movie[] | null }>(),
);
export const loadReviewsMovieSuccess = createAction(
  "[Reviews] Load Reviews Movies Success",
  props<{ reviewsMovie: any }>(),
);
