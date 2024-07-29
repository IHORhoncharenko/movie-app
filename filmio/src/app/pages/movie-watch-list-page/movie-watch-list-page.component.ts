import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ButtonModule } from "primeng/button";
import { Subscription, switchMap, tap } from "rxjs";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import {
  getWatchlistMovies,
  setWatchlistMovies,
} from "../../store/movie-store/actions";
import { selectWatchlistMovies } from "../../store/movie-store/selectors";
import { selectAccountId } from "../../store/user-store/user-selectors";

@Component({
  selector: "app-movie-watch-list-page",
  standalone: true,
  templateUrl: "./movie-watch-list-page.component.html",
  styleUrls: ["./movie-watch-list-page.component.css"],
  imports: [ButtonModule, MovieCardComponent],
})
export class MovieWatchListPageComponent implements OnInit {
  public watchlistMovies: any;
  public mesLoadingStatus = false;
  public isClearList = false;
  public watchlistMoviesIds: number[] = [];
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
          this.store.dispatch(getWatchlistMovies(this.accountId));
          return this.store.select(selectWatchlistMovies);
        }),
      )
      .subscribe((data) => {
        this.watchlistMovies = data;
        this.watchlistMoviesIds = this.watchlistMovies.map((m: any) => m.id);
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      console.log("Відписка від Observable");
      this.subscription.unsubscribe();
    }
  }

  clearMoviesList = () => {
    this.watchlistMoviesIds.map((movieId) => {
      this.store.dispatch(
        setWatchlistMovies({
          accountID: this.accountId,
          media_ids: movieId,
        }),
      );
    });
  };
}
