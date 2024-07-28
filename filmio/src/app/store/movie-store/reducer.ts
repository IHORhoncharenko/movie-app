import { createReducer, on } from "@ngrx/store";
import * as storeActions from "./actions";
import { initialState } from "./state";

export const MovieReducer = createReducer(
  initialState,
  on(storeActions.loadMoviesSuccess, (state, { allMovies }) => {
    return {
      ...state,
      allMovies: allMovies,
    };
  }),

  on(storeActions.loadNowPlaingMoviesSuccess, (state, { nowPlaingMovies }) => {
    return {
      ...state,
      nowPlaingMovies: nowPlaingMovies,
    };
  }),

  on(storeActions.loadPopularMoviesSuccess, (state, { popularMovies }) => {
    return {
      ...state,
      popularMovies: popularMovies,
    };
  }),

  on(storeActions.loadTopMoviesSuccess, (state, { topMovies }) => {
    return {
      ...state,
      topMovies: topMovies,
    };
  }),

  on(storeActions.loadUpcomingMoviesSuccess, (state, { upcomingMovies }) => {
    return {
      ...state,
      upcomingMovies: upcomingMovies,
    };
  }),

  on(storeActions.loadWatchlistMoviesSuccess, (state, { watchlistMovies }) => {
    return {
      ...state,
      watchlistMovies: watchlistMovies,
    };
  }),

  on(storeActions.getFavoriteMoviesSuccess, (state, { favoriteMovies }) => {
    return {
      ...state,
      favoriteMovies: favoriteMovies.results,
    };
  }),

  on(storeActions.selectedMovie, (state, { selectedMovie }) => {
    return {
      ...state,
      selectedMovie: selectedMovie,
    };
  }),

  on(storeActions.loadReviewsMovieSuccess, (state, { reviewsMovie }) => {
    return {
      ...state,
      reviewsMovie: reviewsMovie,
    };
  }),

  on(storeActions.loadMoviesFailure, (state, { error }) => {
    return {
      ...state,
      movies: null,
      error: error,
    };
  }),
  on(storeActions.loadReviewsFailure, (state, { error }) => {
    return {
      ...state,
      reviews: null,
      error: error,
    };
  }),
);
