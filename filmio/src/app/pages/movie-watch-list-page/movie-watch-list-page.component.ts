import { Component, OnInit } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { Subscription, catchError, concatMap, tap, throwError } from "rxjs";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { MoviesService } from "../../services/movies/movies.service";
import { AuthUserService } from "../../services/users/authUser.service.service";

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
        tap(() => {
          this.mesLoadingStatus = true;
        }),
        concatMap((response: any) => {
          this.requestToken = response;
          this.requestToken = this.requestToken.request_token;
          return this.authUserService.getValidToken(this.requestToken).pipe(
            catchError((error) => {
              alert(`This is very bad...${error}`);
              return throwError(error);
            }),
          );
        }),
        concatMap(() => {
          return this.authUserService.createSessionId(this.requestToken).pipe(
            catchError((error) => {
              alert(`This is very bad...${error}`);
              return throwError(error);
            }),
          );
        }),
        concatMap((response: any) => {
          this.sessionID = response;
          this.sessionID = this.sessionID.session_id;
          return this.authUserService.getAccountId(this.sessionID).pipe(
            catchError((error) => {
              alert(`This is very bad...${error}`);
              return throwError(error);
            }),
          );
        }),
        tap(() => {
          this.mesLoadingStatus = false;
        }),
      )
      .subscribe((response) => {
        console.log(response);
        this.watchlistMovies = response;
        this.watchlistMovies = this.watchlistMovies.results;
        this.authUserService.setUserDataTMDB(
          this.requestToken,
          this.sessionID,
          this.accountId,
        );

        console.log(`
          request_token: ${this.requestToken}
          session_id: ${this.sessionID}
          account_id: ${this.accountId}
          watchlistMovies: ${JSON.stringify(this.watchlistMovies)}
          `);
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      console.log("Відписка від Observable");
      this.subscription.unsubscribe();
    }
  }
}
