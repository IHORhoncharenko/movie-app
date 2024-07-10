import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, map } from "rxjs";
import { MovieApi } from "../models/movieApi.models";
import { AuthUserService } from "./authUser.service.service";

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  private apiUrl = "https://api.themoviedb.org/3/movie";
  private apiUrlUserListMovie = "https://api.themoviedb.org/3/account";
  private apiKey = "?api_key=3a52fcc8f8a0f860ecd716dd7a6e6334";

  constructor(
    private http: HttpClient,
    private authUser: AuthUserService,
  ) {}

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

  addToFavorite = (accountID: string, validToken: string, media_id: number) => {
    console.log(
      `
      accountID --- ${accountID},
      validToken --- ${validToken},
      media_id --- ${media_id}
      `,
    );
    return this.http.post(
      `${this.apiUrlUserListMovie}/${accountID}/favorite${this.apiKey}`,
      {
        media_type: "movie",
        media_id: media_id,
        favorite: true,
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${validToken}`,
        },
      },
    );
  };
}
