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
    if (!this.favoritesMoviesId.includes(id)) {
      this.favoritesMoviesId.push(id);
    }
  };
  getWatchListMovies = (id: any) => {
    if (!this.watchlistMoviesId.includes(id)) {
      this.watchlistMoviesId.push(id);
    }
  };
  setFavoritesMovies = () => {
    return this.favoritesMoviesId;
  };
  setWatchListMovies = () => {
    return this.watchlistMoviesId;
  };
  clearWatchListMovies = () => {
    this.watchlistMoviesId = [];
  };
  clearFavoritesMovies = () => {
    this.favoritesMoviesId = [];
  };
}
