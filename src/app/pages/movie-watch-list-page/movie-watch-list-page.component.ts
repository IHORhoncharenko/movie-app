import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ButtonModule } from "primeng/button";
import {
  combineLatest,
  filter,
  map,
  mergeMap,
  switchMap,
  takeUntil,
  tap,
} from "rxjs";
import { ClearObservable } from "../../abstract/clear-observers";
import { LoginPopupComponent } from "../../components/login-popup/login-popup/login-popup.component";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { Movie } from "../../models/movie.models";
import {
  loadWatchListMovies,
  removeMoviesFromWatchList,
} from "../../store/movie-store/actions";
import {
  selectGenresMovie,
  selectSortingMethod,
  selectWatchlistMovies,
} from "../../store/movie-store/selectors";
import {
  selectAccountId,
  selectSessionId,
} from "../../store/user-store/user-selectors";

@Component({
  selector: "app-movie-watch-list-page",
  standalone: true,
  templateUrl: "./movie-watch-list-page.component.html",
  styleUrls: ["./movie-watch-list-page.component.css"],
  imports: [ButtonModule, MovieCardComponent, LoginPopupComponent],
})
export class MovieWatchListPageComponent
  extends ClearObservable
  implements OnInit
{
  public watchlistMovies: Movie[] | null | undefined;
  public watchlistMoviesIds: number[] = [];
  public isShowPopupAutorization: boolean | undefined;
  public isUseSortElements: boolean = false;
  public sortingMovies: Movie[] = [];
  private allGenres: any[] | null | undefined;
  private accountID: string | null | undefined;
  private sessionID: string | null | undefined;

  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    //autorization user
    this.store
      .select(selectAccountId)
      .pipe(
        takeUntil(this.destroy$),
        filter((accountID) => accountID !== null && accountID !== undefined),
        switchMap((accountID) => {
          this.accountID = accountID;
          return this.store.select(selectSessionId);
        }),
        tap((sessionID) => {
          this.sessionID = sessionID;
        }),
        mergeMap(() => {
          this.store.dispatch(
            loadWatchListMovies({
              accountID: this.accountID,
              sessionID: this.sessionID,
            }),
          );
          return this.store.select(selectWatchlistMovies);
        }),
        filter((movies) => movies !== null && movies !== undefined),
        tap((movies) => {
          this.watchlistMovies = movies;
        }),
      )
      .subscribe();

    if (!this.accountID) {
      this.isShowPopupAutorization = true;
    }

    //sorting movies
    combineLatest([
      this.store.select(selectGenresMovie),
      this.store.select(selectSortingMethod),
    ])
      .pipe(
        takeUntil(this.destroy$),
        tap(([sortBy]) => {
          if (!sortBy) {
            this.isUseSortElements = false;
          }
        }),
        filter(
          ([genres, sortBy]) =>
            sortBy !== null &&
            sortBy !== undefined &&
            genres !== undefined &&
            genres !== null,
        ),
        tap(([genres, sortBy]) => {
          this.isUseSortElements = true;
          this.allGenres = genres;

          if (sortBy.selectedSort === "rating" && this.watchlistMovies) {
            this.sortingMovies = [];

            this.sortingMovies = [...this.watchlistMovies].sort((a, b) => {
              if (a.vote_average > b.vote_average) {
                return 1;
              }
              if (a.vote_average < b.vote_average) {
                return -1;
              }
              return 0;
            });
          }

          if (
            sortBy.selectedSort === "genres" &&
            this.watchlistMovies &&
            this.allGenres
          ) {
            this.sortingMovies = [];

            this.allGenres.forEach((genre) => {
              this.watchlistMovies?.forEach((movie) => {
                [...movie.genre_ids].forEach((id) => {
                  if (genre.id === id && !this.sortingMovies.includes(movie)) {
                    this.sortingMovies.push(movie);
                  }
                });
              });
            });
          }

          if (sortBy.selectedSort === "default") {
            this.isUseSortElements = false;
          }
        }),
      )
      .subscribe();
  }

  clearMoviesList = () => {
    if (this.watchlistMovies) {
      this.watchlistMoviesIds = this.watchlistMovies.map((m: any) => m.id);
      this.watchlistMoviesIds.map((movieId) => {
        this.store
          .select(selectAccountId)
          .pipe(
            takeUntil(this.destroy$),
            filter(
              (accountID) => accountID !== null && accountID !== undefined,
            ),
            switchMap((accountID) => {
              this.accountID = accountID;
              return this.store.select(selectSessionId);
            }),
            map((sessionID) => {
              this.sessionID = sessionID;
              return this.store.dispatch(
                removeMoviesFromWatchList({
                  accountID: this.accountID,
                  sessionID: this.sessionID,
                  mediaID: movieId,
                }),
              );
            }),
          )
          .subscribe();
      });
    }
  };
}
