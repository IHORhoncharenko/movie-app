import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { Message } from "primeng/api";
import { BadgeModule } from "primeng/badge";
import { ButtonModule } from "primeng/button";
import { MessagesModule } from "primeng/messages";
import { RatingModule } from "primeng/rating";
import { TabViewModule } from "primeng/tabview";
import { ToggleButtonModule } from "primeng/togglebutton";
import { filter, switchMap, takeUntil, tap } from "rxjs";
import { ClearObservable } from "../../abstract/clear-observers";
import { LoginPopupComponent } from "../../components/login-popup/login-popup/login-popup.component";
import { ReviewComponent } from "../../components/review/review.component";
import { environment } from "../../environments/environment";
import { Movie } from "../../models/movie.models";
import { ConvertingMinutesToHoursPipe } from "../../pipes/convertingMinutesToHours/convertingMinutesToHours.pipe";
import { SafeUrlPipe } from "../../pipes/safeUrl/safeUrl.pipe";
import {
  addFavoriteListMovies,
  addWatchListMovies,
} from "../../store/movie-store/actions";
import {
  selectReviewsMovie,
  selectSelectedMovie,
} from "../../store/movie-store/selectors";
import {
  selectAccountId,
  selectSessionId,
} from "../../store/user-store/user-selectors";

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
    LoginPopupComponent,
    MessagesModule,
  ],
  templateUrl: "./movie-card-page.component.html",
  styleUrls: ["./movie-card-page.component.css"],
})
export class MovieCardPageComponent
  extends ClearObservable
  implements OnInit, OnDestroy
{
  public movieDetailseData: Movie | undefined | null;
  public value: number | undefined;
  public isShowrating = false;
  public correctUrlPoster: string | undefined;
  public isFamilyFriendly: boolean | undefined;
  public reviewsMovie: any | null | undefined;
  public isAutorization: boolean | undefined;
  public isShowPopupAutorization: boolean | undefined;
  public messages: Message[] | undefined;
  public successAddin = false;
  private urlPoster = environment.apiUrlPosterTMDB;
  private accountID: string | null | undefined;
  private sessionID: string | null | undefined;

  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    this.messages = [
      { severity: "info", detail: "Info Message" },
      { severity: "success", detail: "Success Message" },
      { severity: "warn", detail: "Warning Message" },
      { severity: "error", detail: "Error Message" },
      { severity: "secondary", detail: "Secondary Message" },
      { severity: "contrast", detail: "Contrast Message" },
    ];

    this.store
      .select(selectAccountId)
      .pipe(
        takeUntil(this.destroy$),
        filter((accountID) => accountID !== null && accountID !== undefined),
        switchMap((accountID) => {
          this.accountID = accountID;
          return this.store.select(selectSessionId);
        }),
        filter((sessionID) => sessionID !== null && sessionID !== undefined),
        tap((sessionID) => {
          this.sessionID = sessionID;
        }),
      )
      .subscribe(() => {
        this.isAutorization = true;
      });

    this.store
      .select(selectSelectedMovie)
      .pipe(takeUntil(this.destroy$))
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

      this.store
        .select(selectReviewsMovie)
        .pipe(takeUntil(this.destroy$))
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
    if (!this.accountID) {
      this.isAutorization = false;
      this.isShowPopupAutorization = true;
    }
    if (this.movieDetailseData && this.accountID && this.sessionID) {
      this.successAddin = true;
      this.store.dispatch(
        addFavoriteListMovies({
          accountID: this.accountID,
          sessionID: this.sessionID,
          media_id: movieId,
        }),
      );
    }
  };

  choosingWatchlistMovie = (movieId: number) => {
    if (!this.accountID) {
      this.isAutorization = false;
      this.isShowPopupAutorization = true;
    }
    if (this.movieDetailseData && this.accountID && this.sessionID) {
      this.successAddin = true;
      this.store.dispatch(
        addWatchListMovies({
          accountID: this.accountID,
          sessionID: this.sessionID,
          media_id: movieId,
        }),
      );
    }
  };
}
