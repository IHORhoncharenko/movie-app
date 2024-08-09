import { MovieReviews } from "../../models/movie-reviews.models";
import { Movie } from "../../models/movie.models";

export interface MovieState {
  allMovies?: Movie[] | null;
  favoriteMovies?: Movie[] | null;
  watchlistMovies?: Movie[] | null;
  nowPlaingMovies?: Movie[] | null;
  popularMovies?: Movie[] | null;
  topMovies?: Movie[] | null;
  upcomingMovies?: Movie[] | null;
  selectedMovie?: Movie | null;
  reviewsMovie?: MovieReviews | null;
  genresMovie?: any | null;
  searchMovie?: string | null;
  sortingMovie?: any | null;
}

export const initialState: MovieState = {
  allMovies: null,
  favoriteMovies: null,
  watchlistMovies: null,
  nowPlaingMovies: null,
  popularMovies: null,
  topMovies: null,
  upcomingMovies: null,
  selectedMovie: null,
  reviewsMovie: null,
  genresMovie: null,
  searchMovie: null,
  sortingMovie: null,
};
