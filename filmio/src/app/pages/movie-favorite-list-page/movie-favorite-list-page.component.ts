import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ButtonModule } from "primeng/button";
import { MessagesModule } from "primeng/messages";
import { Subscription, switchMap, tap } from "rxjs";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import {
  getFavoriteMovies,
  setFavoriteMovies,
} from "../../store/movie-store/actions";
import { selectFavoriteMovies } from "../../store/movie-store/selectors";
import { selectAccountId } from "../../store/user-store/user-selectors";

@Component({
  selector: "app-movie-favorite-list-page",
  standalone: true,
  imports: [ButtonModule, MovieCardComponent, MessagesModule],
  templateUrl: "./movie-favorite-list-page.component.html",
  styleUrls: ["./movie-favorite-list-page.component.css"],
})
export class MovieFavoriteListPageComponent implements OnInit {
  public favoriteMovies: any = [];
  public favoritesMoviesIds: number[] = [];
  public mesLoadingStatus = false;
  private subscription = new Subscription();
  private accountId: any | null | undefined;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store
      .select(selectAccountId)
      .pipe(
        tap((data: any) => {
          this.accountId = data;
        }),
        switchMap(() => {
          this.store.dispatch(getFavoriteMovies(this.accountId));
          return this.store.select(selectFavoriteMovies);
        }),
      )
      .subscribe((data) => {
        this.favoriteMovies = data;
        this.favoritesMoviesIds = this.favoriteMovies.map((m: any) => m.id);
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      console.log("Відписка від Observable");
      this.subscription.unsubscribe();
    }
  }

  clearMoviesList = () => {
    this.favoritesMoviesIds.map((movieId) => {
      this.store.dispatch(
        setFavoriteMovies({
          accountID: this.accountId,
          media_ids: movieId,
        }),
      );
    });
  };
}
