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

  setFavoritesMovies = (id: any) => {
    if (!this.favoritesMoviesId.includes(id)) {
      this.favoritesMoviesId.push(id);
    }
  };

  setWatchListMovies = (id: any) => {
    if (!this.watchlistMoviesId.includes(id)) {
      this.watchlistMoviesId.push(id);
    }
  };

  getFavoritesMovies = () => {
    return this.favoritesMoviesId;
  };

  getWatchListMovies = () => {
    return this.watchlistMoviesId;
  };

  clearWatchListMovies = () => {
    this.watchlistMoviesId = [];
  };

  clearFavoritesMovies = () => {
    this.favoritesMoviesId = [];
  };
}
