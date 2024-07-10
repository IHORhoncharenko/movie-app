import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, map } from "rxjs";
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
  public page: string = "/favorite" || "/watchlist";
  private apiUrl = "https://api.themoviedb.org/3/movie";
  private apiKey = "?api_key=3a52fcc8f8a0f860ecd716dd7a6e6334";
  private apiUrlValidToken =
    "https://api.themoviedb.org/3/authentication/token/validate_with_login";
  private apiUrlSession =
    "https://api.themoviedb.org/3/authentication/session/new";
  private apiUrlAccount = "https://api.themoviedb.org/3/account";
  private accountId = "/21365380";

  constructor(private http: HttpClient) {}

  getToken = () => {
    return this.http.get(
      `https://api.themoviedb.org/3/authentication/token/new${this.apiKey}`,
      {
        observe: "response",
      },
    );
  };

  getValidToken = (token: string) => {
    return this.http.post(
      `${this.apiUrlValidToken}${this.apiKey}`,
      {
        username: "IHORhoncharenko",
        password: "ejU9v9UxvRjpwe.",
        request_token: token,
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      },
    );
  };

  createSessionId = (token: string) => {
    return this.http.post(
      `${this.apiUrlSession}${this.apiKey}`,
      {
        request_token: token,
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      },
    );
  };

  getUpcomingMovies = () => {
    return this.http.get<MovieApi>(`${this.apiUrl}/upcoming${this.apiKey}`);
  };

  getTopRategMovies = () => {
    return this.http.get<MovieApi>(`${this.apiUrl}/top_rated${this.apiKey}`);
  };

  getPopularMovies = () => {
    return this.http.get<MovieApi>(`${this.apiUrl}/popular${this.apiKey}`);
  };

  getNowPlayingMovies = () => {
    return this.http.get<MovieApi>(`${this.apiUrl}/now_playing${this.apiKey}`);
  };

  getMovieById = (id: number) => {
    return this.getAllMovies().pipe(
      map((data) => {
        return data.find((m) => m.id === id);
      }),
    );
  };

  getAllMovies = () => {
    //forkJoin для об'єднання всіх Observable<MovieApi> в один.
    return forkJoin([
      this.getUpcomingMovies(),
      this.getTopRategMovies(),
      this.getPopularMovies(),
      this.getNowPlayingMovies(),
    ]).pipe(
      map((data) => {
        return data.flatMap((movieApi) => movieApi.results);
      }),
    );
  };

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
      let allMovies = data;

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
      let allMovies = data;

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
