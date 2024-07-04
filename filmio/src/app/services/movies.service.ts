import { Injectable } from "@angular/core";
import { movies } from "../staticData/movies";

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  public favoritesMoviesId: any = [];
  public favoritesMovies: any = [];
  public watchlistMoviesId: any = [];
  public watchlistMovies: any = [];
  public allMovies = movies;

  constructor() {}

  getMovies = () => {
    return movies;
  };

  setFavoritesMoviesId = (id: any) => {
    if (!this.favoritesMoviesId.includes(id)) {
      this.favoritesMoviesId.push(id);
    }
  };

  setWatchListMoviesId = (id: any) => {
    if (!this.watchlistMoviesId.includes(id)) {
      this.watchlistMoviesId.push(id);
    }
  };

  clearWatchListMovies = () => {
    this.watchlistMoviesId = [];
    this.watchlistMovies = [];
  };

  clearFavoritesMovies = () => {
    this.favoritesMoviesId = [];
    this.favoritesMovies = [];
  };

  setFavoritesMovies = () => {
    this.allMovies.forEach((m: any) => {
      this.favoritesMoviesId.forEach((w: any) => {
        if (String(m.id) === String(w)) {
          if (!this.favoritesMovies.includes(m)) {
            this.favoritesMovies.push(m);
          }
        }
      });
    });
  };

  setWatchListMovies = () => {
    this.allMovies.forEach((m: any) => {
      this.watchlistMoviesId.forEach((w: any) => {
        if (String(m.id) === String(w)) {
          if (!this.watchlistMovies.includes(m)) {
            this.watchlistMovies.push(m);
          }
        }
      });
    });
  };

  getFavoritesMovies = () => {
    this.setFavoritesMovies();
    return this.favoritesMovies;
  };

  getWatchListMovies = () => {
    this.setWatchListMovies();
    return this.watchlistMovies;
  };
}
