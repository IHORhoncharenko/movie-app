import { MovieDatesApi } from "./movie-dates-api.models";
import { Movie } from "./movie.models";

export interface MovieApi {
  dates?: MovieDatesApi;
  page: number;
  results: Movie[];
}
