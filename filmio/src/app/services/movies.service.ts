import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, forkJoin } from "rxjs";
import { Movie } from "../models/movie.models";
import { MovieApi } from "../models/movieApi.models";

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  public favoritesMoviesId: number[] = [];
  public favoritesMovies: Movie[] = [];
  public watchlistMoviesId: number[] = [];
  public watchlistMovies: Movie[] = [];

  private apiUrl = "https://api.themoviedb.org/3/movie";
  private apiKey = "?api_key=3a52fcc8f8a0f860ecd716dd7a6e6334";

  constructor(private http: HttpClient) {}

  getUpcomingMovies(): Observable<MovieApi> {
    return this.http.get<MovieApi>(`${this.apiUrl}/upcoming${this.apiKey}`);
  }

  getTopRategMovies(): Observable<MovieApi> {
    return this.http.get<MovieApi>(`${this.apiUrl}/top_rated${this.apiKey}`);
  }

  getPopularMovies(): Observable<MovieApi> {
    return this.http.get<MovieApi>(`${this.apiUrl}/popular${this.apiKey}`);
  }

  getNowPlayingMovies(): Observable<MovieApi> {
    return this.http.get<MovieApi>(`${this.apiUrl}/now_playing${this.apiKey}`);
  }

  getAllMovies(): Observable<MovieApi[]> {
    //forkJoin для об'єднання всіх Observable<MovieApi> в один.
    return forkJoin([
      this.getUpcomingMovies(),
      this.getTopRategMovies(),
      this.getPopularMovies(),
      this.getNowPlayingMovies(),
    ]);
  }

  setFavoritesMoviesId = (id: number) => {
    if (!this.favoritesMoviesId.includes(id)) {
      this.favoritesMoviesId.push(id);
    }
  };

  setWatchListMoviesId = (id: number) => {
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
    this.getAllMovies().subscribe((data) => {
      let allMovies = data.flatMap((movieApi) => movieApi.results);

      allMovies.forEach((m) => {
        this.favoritesMoviesId.forEach((fId: number) => {
          if (Number(m.id) === Number(fId)) {
            if (
              !this.favoritesMovies.some(
                (favMovie: Movie) => favMovie.id === m.id,
              )
            ) {
              this.favoritesMovies.push(m);
            }
          }
        });
      });
    });
  };

  setWatchListMovies = () => {
    this.getAllMovies().subscribe((data) => {
      let allMovies = data.flatMap((movieApi) => movieApi.results);

      allMovies.forEach((m) => {
        this.watchlistMoviesId.forEach((fId: number) => {
          if (Number(m.id) === Number(fId)) {
            if (
              !this.watchlistMovies.some(
                (watchMovie: Movie) => watchMovie.id === m.id,
              )
            ) {
              this.watchlistMovies.push(m);
            }
          }
        });
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
