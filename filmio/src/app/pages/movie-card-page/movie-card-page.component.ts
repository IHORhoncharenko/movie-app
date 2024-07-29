import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { BadgeModule } from "primeng/badge";
import { ButtonModule } from "primeng/button";
import { RatingModule } from "primeng/rating";
import { TabViewModule } from "primeng/tabview";
import { ToggleButtonModule } from "primeng/togglebutton";
import { Subscription, retry } from "rxjs";
import { ReviewComponent } from "../../components/review/review.component";
import { environment } from "../../environments/environment";
import { Movie } from "../../models/movie.models";
import { ConvertingMinutesToHoursPipe } from "../../pipes/convertingMinutesToHours/convertingMinutesToHours.pipe";
import { SafeUrlPipe } from "../../pipes/safeUrl/safeUrl.pipe";
import {
  addToFavoriteMovies,
  addToWatchlistMovies,
} from "../../store/movie-store/actions";
import {
  selectReviewsMovie,
  selectSelectedMovie,
} from "../../store/movie-store/selectors";
import { selectAccountId } from "../../store/user-store/user-selectors";

@Component({
  selector: "app-movie-card-page",
  standalone: true,
  imports: [
    RouterLink,
    ButtonModule,
    ToggleButtonModule,
    FormsModule,
    ConvertingMinutesToHoursPipe,
    RatingModule,
    FormsModule,
    BadgeModule,
    TabViewModule,
    ButtonModule,
    SafeUrlPipe,
    ReviewComponent,
  ],
  templateUrl: "./movie-card-page.component.html",
  styleUrls: ["./movie-card-page.component.css"],
})
export class MovieCardPageComponent implements OnInit, OnDestroy {
  public movieDetailseData: Movie | undefined | null;
  public value: number | undefined;
  public isShowrating = false;
  public correctUrlPoster: string | undefined;
  public isFamilyFriendly: boolean | undefined;
  public reviewsMovie: any | null | undefined;
  private urlPoster = environment.apiUrlPosterTMDB;
  private accountId: number | string | null | undefined;
  private subscriptionSelectMovie: Subscription = new Subscription();
  private subscriptionReviewsMovie: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit() {
    this.store
      .select(selectAccountId)
      .pipe(retry(10))
      .subscribe((data) => {
        this.accountId = data;
      });

    this.subscriptionSelectMovie = this.store
      .select(selectSelectedMovie)
      .subscribe((movie) => {
        this.movieDetailseData = movie;
      });

    if (this.movieDetailseData) {
      this.value = Math.round(Number(this.movieDetailseData.vote_average));
      this.correctUrlPoster = `${this.urlPoster}${this.movieDetailseData.poster_path}`;

      if (this.movieDetailseData.adult === false) {
        this.isFamilyFriendly = true;
      } else {
        this.isFamilyFriendly = false;
      }

      this.subscriptionReviewsMovie = this.store
        .select(selectReviewsMovie)
        .subscribe((data) => {
          this.reviewsMovie = data;
        });
    }
  }

  mouseenter = () => {
    this.isShowrating = true;
  };

  mouseover = () => {
    this.isShowrating = false;
  };

  choosingFavoriteMovie = (movieId: number) => {
    if (this.movieDetailseData) {
      this.store.dispatch(
        addToFavoriteMovies({
          movieId: this.movieDetailseData.id,
          acountId: this.accountId,
        }),
      );
    }
  };

  choosingWatchlistMovie = (movieId: number) => {
    if (this.movieDetailseData) {
      this.store.dispatch(
        addToWatchlistMovies({
          movieId: this.movieDetailseData.id,
          acountId: this.accountId,
        }),
      );
    }
  };

  ngOnDestroy() {
    if (this.subscriptionSelectMovie || this.subscriptionReviewsMovie) {
      console.log(`Відписка від Observable`);
      this.subscriptionSelectMovie.unsubscribe();
      this.subscriptionReviewsMovie.unsubscribe();
    }
  }
}
