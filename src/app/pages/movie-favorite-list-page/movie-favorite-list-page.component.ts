import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ButtonModule } from "primeng/button";
import { MessagesModule } from "primeng/messages";
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
  loadFavoriteListMovies,
  removeMoviesFromFavoriteList,
} from "../../store/movie-store/actions";
import {
  selectFavoriteMovies,
  selectGenresMovie,
  selectSortingMethod,
} from "../../store/movie-store/selectors";
import {
  selectAccountId,
  selectSessionId,
} from "../../store/user-store/user-selectors";

@Component({
  selector: "app-movie-favorite-list-page",
  standalone: true,
  imports: [
    ButtonModule,
    MovieCardComponent,
    MessagesModule,
    LoginPopupComponent,
  ],
  templateUrl: "./movie-favorite-list-page.component.html",
  styleUrls: ["./movie-favorite-list-page.component.css"],
})
export class MovieFavoriteListPageComponent
  extends ClearObservable
  implements OnInit
{
  public favoriteMovies: Movie[] | null | undefined;
  public favoritesMoviesIds: number[] = [];
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
            loadFavoriteListMovies({
              accountID: this.accountID,
              sessionID: this.sessionID,
            }),
          );
          return this.store.select(selectFavoriteMovies);
        }),
        filter((movies) => movies !== null && movies !== undefined),
        tap((movies) => {
          this.favoriteMovies = movies;
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

          if (sortBy.selectedSort === "rating" && this.favoriteMovies) {
            this.sortingMovies = [];

            this.sortingMovies = [...this.favoriteMovies].sort((a, b) => {
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
            this.favoriteMovies &&
            this.allGenres
          ) {
            this.sortingMovies = [];

            this.allGenres.forEach((genre) => {
              this.favoriteMovies?.forEach((movie) => {
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
    if (this.favoriteMovies) {
      this.favoritesMoviesIds = this.favoriteMovies.map((m: any) => m.id);
      this.favoritesMoviesIds.map((movieId) => {
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
            filter(
              (sessionID) => sessionID !== null && sessionID !== undefined,
            ),
            map((sessionID) => {
              this.sessionID = sessionID;
              return this.store.dispatch(
                removeMoviesFromFavoriteList({
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
