import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ButtonModule } from "primeng/button";
import { MessagesModule } from "primeng/messages";
import { Subscription, filter, map, mergeMap, switchMap, tap } from "rxjs";
import { LoginPopupComponent } from "../../components/login-popup/login-popup/login-popup.component";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { Movie } from "../../models/movie.models";
import {
  loadFavoriteListMovies,
  removeMoviesFromFavoriteList,
} from "../../store/movie-store/actions";
import { selectFavoriteMovies } from "../../store/movie-store/selectors";
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
export class MovieFavoriteListPageComponent implements OnInit {
  public favoriteMovies: Movie[] | null | undefined;
  public favoritesMoviesIds: number[] = [];
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
  }

  ngOnDestroy() {
    if (this.subscription) {
      console.log("Відписка від Observable");
      this.subscription.unsubscribe();
    }
  }

  clearMoviesList = () => {
    if (this.favoriteMovies) {
      this.favoritesMoviesIds = this.favoriteMovies.map((m: any) => m.id);
      this.favoritesMoviesIds.map((movieId) => {
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
