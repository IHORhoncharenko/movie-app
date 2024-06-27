import { Injectable } from "@angular/core";
import { movies } from "../staticData/movies";

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  public favoritesMoviesId: any = [];
  public watchlistMoviesId: any = [];
  constructor() {}

  getMovies = () => {
    return movies;
  };

  getFavoritesMovies = (id: any) => {
    this.favoritesMoviesId.push(id);
  };
  getWatchListMovies = (id: any) => {
    this.watchlistMoviesId.push(id);
  };
  setFavoritesMovies = () => {
    return this.favoritesMoviesId;
  };
  setWatchListMovies = () => {
    return this.watchlistMoviesId;
  };
}
