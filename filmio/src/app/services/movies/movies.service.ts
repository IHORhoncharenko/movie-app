import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, map } from "rxjs";
import { environment } from "../../environments/environment";
import { MovieApi } from "../../models/movie-api.models";
import { Movie } from "../../models/movie.models";

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  private apiUrlTMDB = environment.apiUrlTMDB;
  private apiUrlAccountTMDB = environment.apiUrlAccountTMDB;
  private apiKeyTMDB = environment.apiKeyTMDB;
  private baseApiUrlTMDB = environment.baseApiUrlTMDB;
  private tokenTMDB = environment.tokenTMDB;
  private apiUrlFavoriteMoviesTMDB = environment.apiUrlFavoriteMoviesTMDB;
  private apiUrlWatchlistMoviesTMDB = environment.apiUrlWatchlistMoviesTMDB;

  constructor(private http: HttpClient) {}

  getUpcomingMovies = () => {
    return this.http.get<MovieApi>(
      `${this.baseApiUrlTMDB}/${this.apiUrlTMDB}/upcoming?api_key=${this.apiKeyTMDB}`,
    );
  };

  getTopRategMovies = () => {
    return this.http.get<MovieApi>(
      `${this.baseApiUrlTMDB}/${this.apiUrlTMDB}/top_rated?api_key=${this.apiKeyTMDB}`,
    );
  };

  getPopularMovies = () => {
    return this.http.get<MovieApi>(
      `${this.baseApiUrlTMDB}/${this.apiUrlTMDB}/popular?api_key=${this.apiKeyTMDB}`,
    );
  };

  getNowPlayingMovies = () => {
    return this.http.get<MovieApi>(
      `${this.baseApiUrlTMDB}/${this.apiUrlTMDB}/now_playing?api_key=${this.apiKeyTMDB}`,
    );
  };

  getMovieById = (id: number) => {
    return this.getAllMovies().pipe(
      map((data) => {
        console.log(data);
        return data.find((m) => m.id === id);
      }),
    );
  };

  getAllMovies = () => {
    return forkJoin([
      this.getUpcomingMovies(),
      this.getTopRategMovies(),
      this.getPopularMovies(),
      this.getNowPlayingMovies(),
    ]).pipe(
      map((data) => {
        const allMovies: Movie[] = [];
        data.forEach((movieApi) => {
          movieApi.results.forEach((movie) => {
            if (
              !allMovies.find((existingMovie) => existingMovie.id === movie.id)
            ) {
              allMovies.push(movie);
            }
          });
        });
        return allMovies;
      }),
    );
  };

  addToFavorite = (accountID: string, media_id: number, sessionID: string) => {
    return this.http.post(
      `${this.baseApiUrlTMDB}/${this.apiUrlAccountTMDB}/${accountID}/favorite?api_key=${this.apiKeyTMDB}&session_id=${sessionID}`,
      {
        media_type: "movie",
        media_id: media_id,
        favorite: true,
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${this.tokenTMDB}`,
        },
      },
    );
  };

  addToWatchlist = (accountID: string, media_id: number, sessionID: string) => {
    return this.http.post(
      `${this.baseApiUrlTMDB}/${this.apiUrlAccountTMDB}/${accountID}/watchlist?api_key=${this.apiKeyTMDB}&session_id=${sessionID}`,
      {
        media_type: "movie",
        media_id: media_id,
        watchlist: true,
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${this.tokenTMDB}`,
        },
      },
    );
  };

  getFavoriteMovies = (accountID: string, sessionID: string) => {
    return this.http.get<any>(
      `${this.baseApiUrlTMDB}/account/${accountID}/${this.apiUrlFavoriteMoviesTMDB}?api_key=${this.apiKeyTMDB}&session_id=${sessionID}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${this.tokenTMDB}`,
        },
      },
    );
  };
  getWatchlistMovies = (accountID: string, sessionID: string) => {
    return this.http.get<any>(
      `${this.baseApiUrlTMDB}/account/${accountID}/${this.apiUrlWatchlistMoviesTMDB}?api_key=${this.apiKeyTMDB}&session_id=${sessionID}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${this.tokenTMDB}`,
        },
      },
    );
  };

  getReviewsAboutMovie = (movieId: any) => {
    return this.http.get(
      `${this.baseApiUrlTMDB}/movie/${movieId}/reviews?api_key=${this.apiKeyTMDB}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${this.tokenTMDB}`,
        },
      },
    );
  };

  clearFavoriteList = (
    accountID: string,
    media_id: number,
    sessionID: string,
  ) => {
    return this.http.post(
      `${this.baseApiUrlTMDB}/${this.apiUrlAccountTMDB}/${accountID}/favorite?api_key=${this.apiKeyTMDB}&session_id=${sessionID}`,
      {
        media_type: "movie",
        media_id: media_id,
        favorite: false,
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${this.tokenTMDB}`,
        },
      },
    );
  };

  clearWatchlist = (accountID: string, media_id: number, sessionID: string) => {
    return this.http.post(
      `${this.baseApiUrlTMDB}/${this.apiUrlAccountTMDB}/${accountID}/watchlist?api_key=${this.apiKeyTMDB}&session_id=${sessionID}`,
      {
        media_type: "movie",
        media_id: media_id,
        watchlist: false,
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${this.tokenTMDB}`,
        },
      },
    );
  };

  getGenresForMovies = () => {
    return this.http.get(
      `${this.baseApiUrlTMDB}/genre/movie/list?api_key=${this.apiKeyTMDB}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${this.tokenTMDB}`,
        },
      },
    );
  };
}
