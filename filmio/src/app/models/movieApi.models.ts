import { Movie } from "./movie.models";
import { MovieDatesApi } from "./movieDatesApi.models";

export interface MovieApi {
  dates?: MovieDatesApi;
  page: number;
  results: Movie[];
}
