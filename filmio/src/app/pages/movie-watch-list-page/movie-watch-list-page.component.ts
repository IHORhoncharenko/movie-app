import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ButtonModule } from "primeng/button";
import { Subscription, filter, map, mergeMap, switchMap, tap } from "rxjs";
import { LoginPopupComponent } from "../../components/login-popup/login-popup/login-popup.component";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { Movie } from "../../models/movie.models";
import {
  loadWatchListMovies,
  removeMoviesFromWatchList,
} from "../../store/movie-store/actions";
import { selectWatchlistMovies } from "../../store/movie-store/selectors";
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
export class MovieWatchListPageComponent implements OnInit {
  public watchlistMovies: Movie[] | null | undefined;
  public watchlistMoviesIds: number[] = [];
  public isShowPopupAutorization: boolean | undefined;
  private subscription = new Subscription();
  private accountID: string | null | undefined;
  private sessionID: string | null | undefined;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store
      .select(selectAccountId)
      .pipe(
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
  }

  ngOnDestroy() {
    if (this.subscription) {
      console.log("Відписка від Observable");
      this.subscription.unsubscribe();
    }
  }

  clearMoviesList = () => {
    if (this.watchlistMovies) {
      this.watchlistMoviesIds = this.watchlistMovies.map((m: any) => m.id);
      this.watchlistMoviesIds.map((movieId) => {
        this.store
          .select(selectAccountId)
          .pipe(
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
