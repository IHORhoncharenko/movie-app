import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MovieState } from "./state";

export const selectState = createFeatureSelector<MovieState>("movieState");

export const selectLoadAllMovies = createSelector(
  selectState,
  (state) => state.allMovies,
);

export const selectLoadPopularMovies = createSelector(
  selectState,
  (state) => state.popularMovies,
);
export const selectLoadTopMovies = createSelector(
  selectState,
  (state) => state.topMovies,
);
export const selectLoadUpcomingMovies = createSelector(
  selectState,
  (state) => state.upcomingMovies,
);
export const selectLoadNowPlaingMovies = createSelector(
  selectState,
  (state) => state.nowPlaingMovies,
);
export const selectSelectedMovie = createSelector(
  selectState,
  (state) => state.selectedMovie,
);
export const selectReviewsMovie = createSelector(
  selectState,
  (state) => state.reviewsMovie,
);
export const selectFavoriteMovies = createSelector(
  selectState,
  (state) => state.favoriteMovies,
);
export const selectWatchlistMovies = createSelector(
  selectState,
  (state) => state.watchlistMovies,
);
export const selectGenresMovie = createSelector(
  selectState,
  (state) => state.genresMovie,
);
