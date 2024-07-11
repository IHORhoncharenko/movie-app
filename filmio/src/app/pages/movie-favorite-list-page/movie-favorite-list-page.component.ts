import { Component, OnInit } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { Subscription, switchMap } from "rxjs";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { MoviesService } from "../../services/movies/movies.service";
import { AuthUserService } from "../../services/users/authUser.service.service";

@Component({
  selector: "app-movie-favorite-list-page",
  standalone: true,
  imports: [ButtonModule, MovieCardComponent],
  templateUrl: "./movie-favorite-list-page.component.html",
  styleUrls: ["./movie-favorite-list-page.component.css"],
})
export class MovieFavoriteListPageComponent implements OnInit {
  public favoritesMovies: any;
  public isClearList = false;
  private sessionID: any;
  private accountId: any;
  private requestToken: any;
  private subscription = new Subscription();

  constructor(
    private movieService: MoviesService,
    private authUserService: AuthUserService,
  ) {}

  ngOnInit() {
    this.subscription = this.authUserService
      .getRequestToken()
      .pipe(
        switchMap((response: any) => {
          this.requestToken = response;
          this.requestToken = this.requestToken.request_token;
          return this.authUserService.getValidToken(this.requestToken);
        }),
        switchMap(() => {
          return this.authUserService.createSessionId(this.requestToken);
        }),
        switchMap((response: any) => {
          this.sessionID = response;
          this.sessionID = this.sessionID.session_id;
          return this.authUserService.getAccountId(this.sessionID);
        }),
        switchMap((response: any) => {
          this.accountId = response;
          this.accountId = this.accountId.id;
          return this.movieService.getFavoriteMovies(this.accountId);
        }),
      )
      .subscribe((response) => {
        console.log(response);
        this.favoritesMovies = response;
        this.favoritesMovies = this.favoritesMovies.results;
        this.authUserService.setUserData(
          this.requestToken,
          this.sessionID,
          this.accountId,
        );

        console.log(`
          request_token: ${this.requestToken}
          session_id: ${this.sessionID}
          account_id: ${this.accountId}
          favoritesMovies: ${JSON.stringify(this.favoritesMovies)}
          `);
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      console.log("Відписка від Observable");
      this.subscription.unsubscribe();
    }
  }

  clearMoviesList = () => {
    if (!this.isClearList) {
      this.isClearList = true;
    }
  };
}
